import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req, res);

    if (req.method === 'GET') {
      const warehouseItems = await prismadb.warehouse.findMany({
        include: {
          user: true,
          product: true,
        },
      });
      return res.status(200).json(warehouseItems);
    }

    if (req.method === 'POST') {
      const { productId, manufacturer, model, name, quantity, productValue, notes } = req.body;

      const product = await prismadb.products.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      let updatedQuantity = product.quantity;
      if (quantity > 0) {
        updatedQuantity += quantity;
      } else {
        updatedQuantity -= Math.abs(quantity);
        if (updatedQuantity < 0) {
          return res.status(400).json({ error: 'Insufficient quantity in product' });
        }
      }

      const newItem = await prismadb.warehouse.create({
        data: {
          userId: currentUser.id,
          productId,
          manufacturer,
          model,
          name,
          quantity,
          productValue,
          notes: notes || '',
          entryDate: new Date(),
        },
      });

      await prismadb.products.update({
        where: { id: productId },
        data: { quantity: updatedQuantity },
      });

      return res.status(201).json(newItem);
    }
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
