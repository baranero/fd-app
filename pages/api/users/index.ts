import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await serverAuth(req, res);
  if (req.method === "GET") {
    try {
      const firefighters = await prismadb.firefighters.findMany();

      return res.status(200).json(firefighters);
    } catch (error) {
      console.log({ error });
      return res.status(500).end();
    }
  }

  if (req.method === "POST") {
    const { name } = req.body;

    try {
      const user = await prismadb.firefighters.findMany();

      const addedFirefighters = await prismadb.firefighters.create({
        data: {
          id: (Date.now() + Math.random()).toString(),
          name,
        },
      });

      return res.status(200).json(addedFirefighters);
    } catch (error) {
      console.log({ error });
      return res.status(500).end();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
