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

  const userId = session.user.id;
  const fosterId = z.string().parse(req.query.id);

  switch (req.method) {
    case "PATCH":
      try {
        const { isAdmin } = (await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            isAdmin: true,
          },
        })) ?? { isAdmin: false };

        // create foster home if admin
        if (isAdmin) {
          const bodySchema = z.object({
            name: z.string(),
            celebration: z.number(),
            clothes: z.number(),
            culturalDev: z.number(),
            management: z.number(),
            education: z.number(),
            household: z.number(),
            overnightTravel: z.number(),
            recreational: z.number(),
            vehicle: z.number(),
          });
          const body = bodySchema.parse(JSON.parse(req.body));

          const foster = await prisma.foster.update({
            where: {
              id: fosterId,
            },
            data: {
              name: body.name,
            },
          });

          if (!foster) {
            res.status(404).json({
              error: `failed to update foster with id: ${fosterId}`,
              type: "foster",
            });
            return;
          }

          const updatedBudget = await prisma.budget.update({
            where: {
              id: foster.budgetId,
            },
            data: {
              celebration: body.celebration,
              clothes: body.clothes,
              culturalDev: body.culturalDev,
              management: body.management,
              education: body.education,
              household: body.household,
              overnightTravel: body.overnightTravel,
              recreational: body.recreational,
              vehicle: body.vehicle,
            },
          });

          if (!updatedBudget) {
            res.status(404).json({
              error: `failed to update budget with id: ${foster.budgetId}`,
              type: "budget",
            });
            return;
          }

          return res.status(200).json({
            updatedBudget: updatedBudget,
            updatedFoster: foster,
            type: "success",
          });
        } else {
          res.status(500).json({
            error: "in order to access this route, please sign in as admin",
            type: "admin",
          });
          return;
        }
      } catch (error) {
        res.status(404).json({
          error: `failed to edit foster: ${error}`,
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
