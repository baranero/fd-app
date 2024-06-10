import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await serverAuth(req, res);

    if (req.method === 'PUT') {
      const { id } = req.query;
      const { quantity } = req.body;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      console.log(`Updating product with id: ${id} and quantity: ${quantity}`);

      try {
        const updatedProduct = await prismadb.products.update({
          where: { id },
          data: { quantity },
        });
        return res.status(200).json(updatedProduct);
      } catch (updateError) {
        console.error('Error updating product:', updateError);
        return res.status(500).json({ error: 'Failed to update product quantity' });
      }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
