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

  const fosterId = z.string().parse(req.query.id);

  switch (req.method) {
    case "GET":
      try {
        const foster = await prisma.foster.findUnique({
          where: {
            id: fosterId,
          },
        });

        if (!foster) {
          res.status(404).json({
            error: `cannot find foster with id ${fosterId}`,
          });
          return;
        }

        const budget = await prisma.budget.findUnique({
          where: {
            id: foster.budgetId,
          },
        });

        if (!budget) {
          res.status(404).json({
            error: `cannot find foster with id ${foster.budgetId}`,
          });
          return;
        }

        const fosterWithBudgetData = {
          fosterName: foster.name,
          celebrationBudget: budget.celebration,
          clothesBudget: budget.clothes,
          culturalBudget: budget.culturalDev,
          managementBudget: budget.management,
          educationBudget: budget.education,
          householdBudget: budget.household,
          overnightBudget: budget.overnightTravel,
          recreationBudget: budget.recreational,
          vehicleBudget: budget.vehicle,
        };

        res.status(200).json(fosterWithBudgetData);
      } catch (error) {
        res.status(404).json({
          error: `failed to fetch foster: ${error}`,
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
