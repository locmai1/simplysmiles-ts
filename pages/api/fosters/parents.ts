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
          const fostersWithUsers = await prisma.foster.findMany({
            include: {
              user: true,
            },
          });

          if (!fostersWithUsers) {
            res.status(404).json({
              error: `failed to fetch all fosters`,
              type: "foster",
            });
            return;
          }

          const usersFosterData = fostersWithUsers.map((foster) => {
            return {
              fosterName: foster.name,
              fosterId: foster.id,
              users: foster.user.map((user) => {
                return {
                  userId: user.id,
                  name: user.name,
                  email: user.email,
                  admin: user.isAdmin,
                };
              }),
            };
          });

          if (!usersFosterData) {
            res.status(404).json({
              error: `failed to fetch all users for each foster`,
              type: "user",
            });
            return;
          }

          res.status(200).json({
            usersFosterData,
            type: "success",
          });
          return;
        } else {
          res.status(500).json({
            error: "in order to access this route, please sign in as admin",
            type: "admin",
          });
          return;
        }
      } catch (error) {
        res.status(500).json({
          error: `failed to fetch users: ${error}`,
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
