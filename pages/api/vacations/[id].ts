import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await serverAuth(req, res);

    if (req.method !== "DELETE") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    if (!id) {
      return res.status(400).json({ error: "Missing ID parameter" });
    }

    const deletedVacations = await prismadb.vacations.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json(deletedVacations);
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
