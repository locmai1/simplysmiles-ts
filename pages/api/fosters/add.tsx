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
        if (admin) {
          const bodySchema = z.object({
            userIds: z.array(z.string()),
            budgetId: z.string(),
            name: z.string(),
          });
          const body = bodySchema.parse(JSON.parse(req.body));
          const fosterEntry = await prisma.foster.create({
            data: {
              userIds: body.userIds,
              budgetId: body.budgetId,
              name: body.name,
            },
          });
          res.status(200).json(fosterEntry);
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
