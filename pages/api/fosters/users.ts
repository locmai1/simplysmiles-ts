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
          const usersWithNoFoster = await prisma.user.findMany({
            where: {
              foster: null,
            },
          });

          if (!usersWithNoFoster) {
            res.status(404).json({
              error: `failed to get all users with no foster`,
              type: "user",
            });
          }

          const usersNoFosterData = {
            fosterName: "No Foster Home",
            users: usersWithNoFoster.map((user) => {
              return {
                userId: user.id,
                name: user.name,
                email: user.email,
                admin: user.isAdmin,
              };
            }),
          };

          if (!usersNoFosterData) {
            res.status(404).json({
              error: `failed to get users' information`,
              type: "user",
            });
          }

          res.status(200).json({
            usersNoFosterData,
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
