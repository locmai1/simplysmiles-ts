import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
      type: "access",
    });
    return;
  }

  const userId = session.user.id;

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

        if (isAdmin) {
          const homes = await prisma.foster.findMany();

          if (!homes) {
            res.status(404).json({
              error: `user ${userId} has no associated foster homes`,
              type: "foster",
            });
            return;
          }

          res.status(200).json({
            homes,
            type: "success",
          });
          return;
        } else {
          const homes = await prisma.foster.findMany({
            where: {
              user: {
                some: {
                  id: userId,
                },
              },
            },
          });

          if (!homes) {
            res.status(404).json({
              error: `user ${userId} has no associated foster homes`,
              type: "foster",
            });
            return;
          }

          res.status(200).json({
            homes,
            type: "user",
          });
          return;
        }
      } catch (error) {
        res.status(500).json({
          error: `failed to fetch fosters: ${error}`,
          type: "failed",
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
