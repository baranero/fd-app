import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'DELETE') {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    const name = Array.isArray(req.query.name) ? req.query.name[0] : req.query.name;
    console.log(req.query);
    try {
      await serverAuth(req, res);
      
      await prismadb.overhours.deleteMany({
        where: {
          userId: id,
        },
      });

      await prismadb.vacations.deleteMany({
        where: {
          userId: id,
        },
      });

      await prismadb.user.deleteMany({
        where: {
          id: id,
        },
      });
  
      const deletedUsers = await prismadb.firefighters.delete({
        where: {
          id: id,
        },
        include: {
          overhours: true,
          vacations: true,
        }
      })
      return res.status(200).json(deletedUsers);
    } catch (error) {
      console.log({ error })
      return res.status(500).end();
    }

  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}


