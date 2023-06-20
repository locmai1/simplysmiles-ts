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
      type: "access",
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
            isAdmin: z.boolean(),
          });
          const body = bodySchema.parse(JSON.parse(req.body));

          const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });

          if (!user) {
            res.status(400).json({
              error: `user with id ${userId} doesn't exist`,
              type: `user`,
            });
            return;
          }

          const passwordMatch = await bcrypt.compare(
            body.password,
            user.password
          );

          if (!passwordMatch) {
            res.status(400).json({
              error: `passwords do not match`,
              type: `password`,
            });
            return;
          }

          const hashedPassword = await bcrypt.hash(body.password, 10);

          // Foster home change and email change
          if (body.fosterName != "None" && body.email != user.email) {
            const foster = await prisma.foster.findUnique({
              where: {
                name: body.fosterName,
              },
            });

            if (!foster) {
              res.status(404).json({
                error: `failed to find foster with name: ${body.fosterName}`,
                type: `foster`,
              });
              return;
            }

            const existingEmail = await prisma.user.findUnique({
              where: {
                email: body.email,
              },
            });

            if (existingEmail) {
              res.status(400).json({
                error: `there is an existing user under this email`,
                type: `email`,
              });
              return;
            }

            const updatedUser = await prisma.user.update({
              where: {
                id: userId,
              },
              data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
                fosterId: foster.id,
                isAdmin: body.isAdmin,
              },
            });

            if (!updatedUser) {
              res.status(404).json({
                error: `failed to update user with id: ${userId}`,
                type: `user`,
              });
              return;
            }

            res.status(200).json({
              ...updatedUser,
              password: body.password,
              type: "success",
            });
            return;
            // Foster home change and no email change
          } else if (body.fosterName != "None" && body.email == user.email) {
            const foster = await prisma.foster.findUnique({
              where: {
                name: body.fosterName,
              },
            });

            if (!foster) {
              res.status(404).json({
                error: `failed to find foster with name: ${body.fosterName}`,
                type: `foster`,
              });
              return;
            }

            const updatedUser = await prisma.user.update({
              where: {
                id: userId,
              },
              data: {
                name: body.name,
                // email: body.email,
                password: hashedPassword,
                fosterId: foster.id,
                isAdmin: body.isAdmin,
              },
            });

            if (!updatedUser) {
              res.status(404).json({
                error: `failed to update user with id: ${userId}`,
                type: `user`,
              });
              return;
            }

            res.status(200).json({
              ...updatedUser,
              password: body.password,
              type: "success",
            });
            return;
            // No foster home and email change
          } else if (body.fosterName == "None" && body.email != user.email) {
            const existingEmail = await prisma.user.findUnique({
              where: {
                email: body.email,
              },
            });

            if (existingEmail) {
              res.status(400).json({
                error: `there is an existing user under this email`,
                type: `email`,
              });
              return;
            }

            const updatedUser = await prisma.user.update({
              where: {
                id: userId,
              },
              data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
                fosterId: null,
                isAdmin: body.isAdmin,
              },
            });

            if (!updatedUser) {
              res.status(404).json({
                error: `failed to update user with id: ${userId}`,
                type: `user`,
              });
              return;
            }

            res.status(200).json({
              ...updatedUser,
              password: body.password,
              type: "success",
            });
            return;
            // No foster home and no email change
          } else {
            const updatedUser = await prisma.user.update({
              where: {
                id: userId,
              },
              data: {
                name: body.name,
                // email: body.email,
                password: hashedPassword,
                fosterId: null,
                isAdmin: body.isAdmin,
              },
            });

            if (!updatedUser) {
              res.status(404).json({
                error: `failed to update user with id: ${userId}`,
                type: `user`,
              });
              return;
            }

            res.status(200).json({
              ...updatedUser,
              password: body.password,
              type: "success",
            });
            return;
          }
        } else {
          res.status(500).json({
            error: "in order to access this route, please sign in as admin",
            type: `admin`,
          });
          return;
        }
      } catch (error) {
        res.status(404).json({
          error: `failed to edit user: ${error}`,
          type: `failed`,
        });
      }
      break;

    default:
      res.status(500).json({
        error: `method ${req.method} not implemented`,
        type: `method`,
      });
      break;
  }
};

export default handler;
