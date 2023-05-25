import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        return res.status(405).end();
      }

  if (req.method === 'GET') {
    try {
    await serverAuth(req, res);

    const usersList = await prismadb.user.findMany();

    return res.status(200).json(usersList);
    } catch (error) {
      console.log({ error })
      return res.status(500).end();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }

}