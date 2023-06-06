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
      const firefighters = await prismadb.firefighters.findMany();
      return res.status(200).json(firefighters);
    }

    if (req.method === "POST") {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const addedFirefighter = await prismadb.firefighters.create({
        data: {
          id: (Date.now() + Math.random()).toString(),
          name,
        },
      });

      return res.status(200).json(addedFirefighter);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
