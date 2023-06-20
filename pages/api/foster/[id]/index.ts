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

  const fosterId = z.string().parse(req.query.id);
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

        const foster = await prisma.foster.findUnique({
          where: {
            id: fosterId,
          },
          include: {
            user: true,
          },
        });

        if (!foster) {
          res.status(404).json({
            error: `cannot find foster with id ${fosterId}`,
            type: "foster",
          });
          return;
        }

        if (isAdmin) {
          const budget = await prisma.budget.findUnique({
            where: {
              id: foster.budgetId,
            },
          });

          if (!budget) {
            res.status(404).json({
              error: `cannot find budget with id ${foster.budgetId}`,
              type: "budget",
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
          return;
          // if the foster with [id] contains the userId of the session
        } else if (foster.user.some((user) => user.id === userId)) {
          const budget = await prisma.budget.findUnique({
            where: {
              id: foster.budgetId,
            },
          });

          if (!budget) {
            res.status(404).json({
              error: `cannot find budget with id ${foster.budgetId}`,
              type: "budget",
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

          res.status(200).json({
            fosterWithBudgetData,
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
        res.status(404).json({
          error: `failed to fetch foster: ${error}`,
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
