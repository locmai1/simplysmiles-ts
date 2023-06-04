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

  const budgetId = z.string().parse(req.query.id);

  switch (req.method) {
    case "GET":
      try {
        const budget = await prisma.budget.findUnique({
          where: {
            id: budgetId,
          },
        });

        if (!budget) {
          res.status(404).json({
            error: `cannot find budget with id ${budgetId}`,
          });
          return;
        }

        res.status(200).json(budget);
      } catch (error) {
        res.status(404).json({
          error: `failed to fetch budget: ${error}`,
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
