import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Sprawdzenie autoryzacji użytkownika
    await serverAuth(req, res);

    // Sprawdzenie metody HTTP
    if (req.method !== "DELETE") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Pobranie ID z zapytania
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    // Sprawdzenie, czy ID zostało przekazane
    if (!id) {
      return res.status(400).json({ error: "Missing ID parameter" });
    }

    // Usunięcie wpisu z bazy danych
    const deletedItem = await prismadb.warehouse.delete({
      where: {
        id: id,
      },
    });

    // Zwrócenie odpowiedzi z usuniętym wpisem
    return res.status(200).json(deletedItem);
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
