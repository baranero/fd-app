import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await serverAuth(req, res);

    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      // Znajdź użytkowników powiązanych ze strażakiem
      const users = await prismadb.user.findMany({
        where: {
          firefighter: {
            id,
          },
        },
      });

      // Rozpocznij transakcję usunięcia strażaka i powiązanych użytkowników
      await prismadb.$transaction(async (prisma) => {
        // Usuń użytkowników, jeśli istnieją
        if (users.length > 0) {
          const userIds = users.map(user => user.id);
          await prisma.user.deleteMany({
            where: {
              id: {
                in: userIds,
              },
            },
          });
        }

        // Usuń strażaka
        await prisma.firefighters.delete({
          where: { id },
        });
      });

      return res.status(200).json({ message: 'Firefighter and associated users deleted successfully' });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
