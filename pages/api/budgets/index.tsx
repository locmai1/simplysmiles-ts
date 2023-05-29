import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
    });
    return;
  }

  const userId = session.user.id;

  switch (req.method) {
    case "GET":
      try {
        const budgets = await prisma.budget.findMany({
          where: {
            foster: {
              is: {
                id: userId,
              },
            },
          },
        });

        if (!budgets) {
          res.status(404).json({
            error: `user ${userId} has no associated homes with budgets`,
          });
          return;
        }

        res.status(200).json(budgets);
        return;
      } catch (error) {
        res.status(500).json({
          error: `failed to fetch budgets: ${error}`,
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
