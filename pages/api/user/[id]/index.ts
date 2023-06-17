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
    });
    return;
  }

  const userId = z.string().parse(req.query.id);

  switch (req.method) {
    case "GET":
      try {
        const { isAdmin } = (await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            isAdmin: true,
          },
        })) ?? { isAdmin: false };

        // TODO: check for admin status
        // TODO: if the user [id] matches the sessio, then return the user info
        if (isAdmin) {
          const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });

          if (!user) {
            res.status(404).json({
              error: `cannot find user with id ${userId}`,
            });
            return;
          }

          res.status(200).json(user);
          return;
        } else if (userId == session.user.id) {
          const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });

          if (!user) {
            res.status(404).json({
              error: `cannot find user with id ${userId}`,
            });
            return;
          }

          res.status(200).json(user);
          return;
        } else {
          res.status(500).json({
            error: "in order to access this route, please sign in as admin",
          });
          return;
        }
      } catch (error) {
        res.status(404).json({
          error: `failed to fetch user: ${error}`,
        });
      }
      break;

    default:
      res.status(500).json({
        error: `method ${req.method} not implemented`,
      });
      break;
  }
};

export default handler;
