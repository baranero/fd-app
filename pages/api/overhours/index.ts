import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  if (req.method === 'GET') {
    try {
    await serverAuth(req, res);

    const overhours = await prismadb.overhours.findMany();

    return res.status(200).json(overhours);
    } catch (error) {
      console.log({ error })
      return res.status(500).end();
    }
  } 
  
  if (req.method === 'POST') {
   
    const { amount, name } = req.body


    
    try {
      await serverAuth(req, res);
      const overhours = await prismadb.overhours.findMany();

      const user = await prismadb.firefighters.findUnique({
        where: {
          name: name
        }
      }
      )
      

      const addedOverhours = await prismadb.overhours.create({
        data: {
            id: (overhours.length + 1).toString(),
            amount: +amount,
            userId: user!.id
        }
      })

      return res.status(200).json(addedOverhours);
    } catch (error) {
      console.log({ error })
      return res.status(500).end();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}


