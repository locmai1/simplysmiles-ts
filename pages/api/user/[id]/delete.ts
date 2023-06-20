import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { z } from "zod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
      type: "access",
    });
    return;
  }

  const userId = z.string().parse(req.query.id);

  switch (req.method) {
    case "DELETE":
      try {
        const { isAdmin } = (await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
          select: {
            isAdmin: true,
          },
        })) ?? { isAdmin: false };

        if (isAdmin) {
          const deleted = await prisma.user.delete({
            where: {
              id: userId,
            },
          });

          if (!deleted) {
            res.status(404).json({
              error: `failed to delete user with id: ${userId}`,
              type: "user",
            });
          }
        } else {
          res.status(500).json({
            error: "in order to access this route, please sign in as admin",
            type: "admin",
          });
          return;
        }
      } catch (error) {
        res.status(404).json({
          error: `failed to delete user: ${error}`,
          type: "user",
        });
      }
      break;

    default:
      res.status(500).json({
        error: `method ${req.method} not implemented`,
        type: "method",
      });
      break;
  }
};

export default handler;
