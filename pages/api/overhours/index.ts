import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { amount } = req.body

  console.log(req.body);
  

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
   

    try {
      await serverAuth(req, res);
      const overhours = await prismadb.overhours.findMany();
      const addedOverhours = await prismadb.overhours.create({
        data: {
            id: (overhours.length + 1).toString(),
            amount: +amount,
            userId: '1'
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


