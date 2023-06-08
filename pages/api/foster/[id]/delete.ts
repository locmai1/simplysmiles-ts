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

  const userId = session.user.id;
  const fosterId = z.string().parse(req.query.id);

  switch (req.method) {
    case "DELETE":
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
          const foster = await prisma.foster.findUnique({
            where: {
              id: fosterId,
            },
            select: {
              budgetId: true,
            },
          });

          if (!foster) {
            res.status(404).json({
              error: `failed to get budget of foster with id: ${fosterId}`,
            });
          }

          const disconnect = await prisma.user.updateMany({
            where: {
              fosterId: fosterId,
            },
            data: {
              fosterId: {
                set: null,
              },
            },
          });

          if (!disconnect) {
            res.status(404).json({
              error: `failed to disconnect foster from users`,
            });
          }

          const deleted = await prisma.budget.delete({
            where: {
              id: foster.budgetId,
            },
          });

          if (!deleted) {
            res.status(404).json({
              error: `failed to delete foster with id: ${fosterId}`,
            });
          }

          res.status(200).json({
            message: "successfully deleted foster home",
          });
        } else {
          res.status(500).json({
            error: "in order to access this route, please sign in as admin",
          });
          return;
        }
      } catch (error) {
        res.status(400).json({
          error: `failed to delete foster: ${error}`,
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
