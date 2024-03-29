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

  const userId = z.string().parse(req.query.id);

  switch (req.method) {
    case "GET":
      try {
        const { isAdmin } = (await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
          select: {
            isAdmin: true,
          },
        })) ?? { isAdmin: false };

        // TODO: check for admin status
        // TODO: if the user [id] matches the sessio, then return the user info
        if (isAdmin) {
          const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });

          if (!user) {
            res.status(404).json({
              error: `cannot find user with id ${userId}`,
              type: "user",
            });
            return;
          }

          let fosterName = "None";

          if (user.fosterId) {
            const foster = await prisma.foster.findUnique({
              where: {
                id: user.fosterId,
              },
              select: {
                name: true,
              },
            });
            fosterName = foster.name;
          }

          const info = {
            name: user.name,
            email: user.email,
            password: "",
            fosterName: fosterName,
            isAdmin: user.isAdmin,
            type: "success",
          };

          res.status(200).json({
            info,
            type: "success",
          });
          return;
        } else if (userId == session.user.id) {
          const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });

          if (!user) {
            res.status(404).json({
              error: `cannot find user with id ${userId}`,
              type: "user",
            });
            return;
          }

          let fosterName = "None";

          if (user.fosterId) {
            const foster = await prisma.foster.findUnique({
              where: {
                id: user.fosterId,
              },
              select: {
                name: true,
              },
            });
            fosterName = foster.name;
          }

          const info = {
            name: user.name,
            email: user.email,
            password: "",
            fosterName: fosterName,
            isAdmin: user.isAdmin,
            type: "success",
          };

          res.status(200).json({
            info,
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
          error: `failed to fetch user: ${error}`,
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
