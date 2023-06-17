import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { z } from "zod";
import bcrypt from "bcryptjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    res.status(401).json({
      error: "This route is protected. In order to access it, please sign in.",
    });
    return;
  }

  const userId = z.string().parse(req.query.id);

  switch (req.method) {
    case "PATCH":
      try {
        const { isAdmin } = (await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
          select: {
            isAdmin: true,
          },
        })) ?? { isAdmin: false };

        // create foster home if admin
        if (isAdmin) {
          const bodySchema = z.object({
            name: z.string(),
            email: z
              .string()
              .regex(
                /^(?:\w+|\w+([+\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-z]{2,4})+)$/gm,
                "Invalid Email"
              ),
            password: z
              .string()
              .min(6, "Password should be minimum 6 characters"),
            fosterName: z.string(),
          });
          const body = bodySchema.parse(JSON.parse(req.body));
          const hashedPassword = await bcrypt.hash(body.password, 10);

          const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });

          if (!user) {
            res.status(400).json({
              error: `user with id ${userId} doesn't exist`,
            });
            return;
          }

          const foster = await prisma.foster.findUnique({
            where: {
              name: body.fosterName,
            },
          });

          if (!foster) {
            res.status(404).json({
              error: `failed to find foster with name: ${body.fosterName}`,
            });
            return;
          }

          const updatedUser = await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              name: body.name,
              email: body.name,
              password: hashedPassword,
              fosterId: foster.id,
            },
          });

          if (!updatedUser) {
            res.status(404).json({
              error: `failed to update user with id: ${userId}`,
            });
            return;
          }

          res.status(200).json({
            ...updatedUser,
            password: body.password,
          });
          return;
        } else {
          res.status(500).json({
            error: "in order to access this route, please sign in as admin",
          });
          return;
        }
      } catch (error) {
        res.status(400).json({
          error: `failed to edit user: ${error}`,
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
