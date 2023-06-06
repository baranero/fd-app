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
      const overhours = await prismadb.overhours.findMany();
      return res.status(200).json(overhours);
    }

    if (req.method === "POST") {
      const { amount, name } = req.body;

      if (!amount || !name) {
        return res.status(400).json({ error: "Amount and name are required" });
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

      const addedOverhours = await prismadb.overhours.create({
        data: {
          id: (Date.now() + Math.random()).toString(),
          amount: +amount,
          userId: user.id,
        },
      });

      return res.status(200).json(addedOverhours);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
