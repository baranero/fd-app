import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    try {
    await serverAuth(req, res);

    const firefighters = await prismadb.firefighters.findMany();

    return res.status(200).json(firefighters);
    } catch (error) {
      console.log({ error })
      return res.status(500).end();
    }
  }

  if (req.method === 'POST') {
   
    const { name } = req.body


    
    try {
      await serverAuth(req, res);

      const user = await prismadb.firefighters.findMany()
      

      const addedFirefighters = await prismadb.firefighters.create({
        data: {
            id: (user.length + 1).toString(),
            name,
        }
      })

      return res.status(200).json(addedFirefighters);
    } catch (error) {
      console.log({ error })
      return res.status(500).end();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }

}