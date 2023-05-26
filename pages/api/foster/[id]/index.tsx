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
        const foster = await prisma.findUnique({
          where: fosterId,
        });

        if (!foster) {
          res.status(404).json({
            error: `cannot find foster with id ${fosterId}`,
          });
          return;
        }

        res.status(200).json(foster);
      } catch (error) {
        res.status(404).json({
          error: `failed to fetch foster: ${error}`,
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
