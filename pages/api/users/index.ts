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

      const newUser = await prismadb.user.create({
        data: {
          name,
        },
      });

      return res.status(201).json(newUser);
    }

    if (req.method === 'GET') {
      const users = await prismadb.user.findMany();
      return res.status(200).json(users);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
