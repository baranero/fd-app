import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  if (req.method === 'GET') {

    console.log(req.body);
    
    try {
    await serverAuth(req, res);

    const vacations = await prismadb.vacations.findMany();

    return res.status(200).json(vacations);
    } catch (error) {
      console.log({ error })
      return res.status(500).end();
    }
  }
  
  if (req.method === 'POST') {
   
    const { amount, name, type } = req.body


    
    try {
      await serverAuth(req, res);
      const vacations = await prismadb.vacations.findMany();

      const user = await prismadb.firefighters.findUnique({
        where: {
          name: name
        }
      }
      )
      

      const addedVacations = await prismadb.vacations.create({
        data: {
            id: (vacations.length + 1).toString(),
            amount: +amount,
            type,
            userId: user!.id
        }
      })

      return res.status(200).json(addedVacations);
    } catch (error) {
      console.log({ error })
      return res.status(500).end();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}


