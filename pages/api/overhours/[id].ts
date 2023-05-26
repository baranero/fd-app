import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'DELETE') {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    console.log(req.query);
    try {
      await serverAuth(req, res);

      

      console.log(req.body);
      
  
      const overhours = await prismadb.overhours.delete({
        where: {
          id: id,
        }
      })
      return res.status(200).json(overhours);
    } catch (error) {
      console.log({ error })
      return res.status(500).end();
    }

  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}


