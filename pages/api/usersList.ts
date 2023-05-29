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
      const usersList = await prismadb.user.findMany();

      return res.status(200).json(usersList);
    } catch (error) {
      console.log({ error });
      return res.status(500).end();
    }
  } else if (req.method === "PUT") {
    try {
      const { name, admin } = req.body;

      const usersList = await prismadb.user.update({
        where: {
          name: name,
        },
        data: {
          isAdmin: admin,
        },
      });

      return res.status(200).json(usersList);
    } catch (error) {
      console.log({ error });
      return res.status(500).end();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
