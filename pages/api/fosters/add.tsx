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
        // check if admin
        const { admin } = (await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            admin: true,
          },
        })) ?? { admin: false };

        // create foster home if admin
        // TODO: req.body accepts budget params -> prisma create budget -> get budgetId to create foster
        if (admin) {
          // const bodySchema = z.object({
          //   userIds: z.array(z.string()),
          //   budgetId: z.string(),
          //   name: z.string(),
          // });
          // const body = bodySchema.parse(JSON.parse(req.body));
          // const fosterEntry = await prisma.foster.create({
          //   data: {
          //     userIds: body.userIds,
          //     budgetId: body.budgetId,
          //     name: body.name,
          //   },
          // });
          // res.status(200).json(fosterEntry);

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

          const budget = await prisma.create({
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
            include: {
              id: true,
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
              userIds: [userId],
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

          res.status(200).json(foster);
        } else {
          res.status(500).json({
            error: "in order to access this route, please sign in as admin",
          });
          return;
        }
      } catch (error) {
        res.status(500).json({
          error: `failed to create foster home: ${error}`,
        });
      }

    default:
      res.status(500).json({
        error: `method ${req.method} not implemented`,
      });
      break;
  }
};

export default handler;
