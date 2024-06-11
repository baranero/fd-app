import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await serverAuth(req, res);

    if (req.method === 'POST') {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const newFirefighter = await prismadb.firefighters.create({
        data: {
          name,
        },
      });

      return res.status(201).json(newFirefighter);
    }

    if (req.method === 'GET') {
      const firefighters = await prismadb.firefighters.findMany();
      return res.status(200).json(firefighters);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
