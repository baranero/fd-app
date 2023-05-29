import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await serverAuth(req, res);
  if (req.method === 'DELETE') {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    console.log(req.query);
    try {

      

      console.log(req.body);
      
  
      const deletedVacations = await prismadb.vacations.delete({
        where: {
          id: id,
        }
      })
      return res.status(200).json(deletedVacations);
    } catch (error) {
      console.log({ error })
      return res.status(500).end();
    }

  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}


