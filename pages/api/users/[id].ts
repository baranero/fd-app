import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await serverAuth(req, res);

    const id = req.query.id as string | undefined;
    const name = req.query.name as string | undefined;

    if (!id) {
      return res.status(400).json({ error: "Missing ID parameter" });
    }

    const deleteFirefighterPromise = prismadb.firefighters.delete({
      where: {
        id: id,
      },
      include: {
        overhours: true,
        vacations: true,
      },
    });

    const deleteOverhoursPromise = prismadb.overhours.deleteMany({
      where: {
        userId: id,
      },
    });

    const deleteVacationsPromise = prismadb.vacations.deleteMany({
      where: {
        userId: id,
      },
    });

    const deleteUserPromise = prismadb.user.deleteMany({
      where: {
        id: id,
      },
    });

    await Promise.all([
      deleteFirefighterPromise,
      deleteOverhoursPromise,
      deleteVacationsPromise,
      deleteUserPromise,
    ]);

    return res.status(200).json({
      deletedUsers: {
        firefighters: deleteFirefighterPromise,
        overhours: deleteOverhoursPromise,
        vacations: deleteVacationsPromise,
        users: deleteUserPromise,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}