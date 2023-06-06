import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await serverAuth(req, res);

    if (req.method === "GET") {
      const vacations = await prismadb.vacations.findMany();
      return res.status(200).json(vacations);
    }

    if (req.method === "POST") {
      const { amount, name, type } = req.body;

      if (!amount || !name || !type) {
        return res.status(400).json({ error: "Amount, name, and type are required" });
      }

      const user = await prismadb.firefighters.findUnique({
        where: {
          name: name,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const addedVacations = await prismadb.vacations.create({
        data: {
          id: (Date.now() + Math.random()).toString(),
          amount: +amount,
          type: type,
          userId: user.id,
        },
      });

      return res.status(200).json(addedVacations);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
