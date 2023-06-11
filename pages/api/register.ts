import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import bcrypt from "bcryptjs";

const registerUserSchema = z.object({
  email: z
    .string()
    .regex(
      /^(?:\w+|\w+([+\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-z]{2,4})+)$/gm,
      "Invalid Email"
    ),
  password: z.string().min(6, "Password should be minimum 6 characters"),
});
const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userData = registerUserSchema.parse(req.body);

  switch (req.method) {
    case "POST":
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: userData.email,
          },
        });

        if (user !== null) {
          res.status(400).json({
            error: `use`,
          });
          return;
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = await prisma.user.create({
          data: {
            email: userData.email,
            password: hashedPassword,
          },
        });

        if (newUser !== null) {
          res.status(404).json({
            error: `unknown error when creating new user`,
          });
          return;
        }

        res.status(200).json(newUser);
      } catch (error) {
        res.status(500).json({
          error: `failed to create new user: ${error}`,
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
