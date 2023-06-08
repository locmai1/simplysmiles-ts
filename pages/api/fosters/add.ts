import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
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

  switch (req.method) {
    case "POST":
      try {
        const { isAdmin } = (await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            isAdmin: true,
          },
        })) ?? { isAdmin: false };

        // check if admin
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

          // check if existing home
          const existingHome = await prisma.foster.findUnique({
            where: {
              name: body.name,
            },
          });

          if (existingHome) {
            res.status(400).json({
              error: `already existing home name`,
            });
            return;
          }

          const budget = await prisma.budget.create({
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

          if (!budget) {
            res.status(404).json({
              error: `failed to create new budget`,
            });
            return;
          }

          const foster = await prisma.foster.create({
            data: {
              budgetId: budget.id,
              name: body.name,
            },
          });

          if (!foster) {
            res.status(404).json({
              error: `failed to create new foster`,
            });
            return;
          }

          const user = await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              fosterId: foster.id,
            },
          });

          if (!user) {
            res.status(404).json({
              error: `failed to add foster to user`,
            });
            return;
          }

          res.status(200).json(foster);
          return;
        } else {
          res.status(500).json({
            error: "in order to access this route, please sign in as admin",
          });
          return;
        }
      } catch (error) {
        res.status(400).json({
          error: `failed to create foster home: ${error}`,
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
