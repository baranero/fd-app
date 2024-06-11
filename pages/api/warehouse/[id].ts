import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req, res);

    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      // Znajdź rekord w tabeli warehouse, który chcemy usunąć
      const warehouseItem = await prismadb.warehouse.findUnique({
        where: { id },
      });

      if (!warehouseItem) {
        return res.status(404).json({ error: 'Record not found' });
      }

      // Usuń rekord z tabeli warehouse
      await prismadb.warehouse.delete({
        where: { id },
      });

      // Aktualizuj ilość produktu w tabeli products
      const product = await prismadb.products.findUnique({
        where: { id: warehouseItem.productId },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const updatedQuantity = product.quantity - warehouseItem.quantity;

      await prismadb.products.update({
        where: { id: warehouseItem.productId },
        data: { quantity: updatedQuantity },
      });

      return res.status(200).json({ message: 'Record deleted and product quantity updated' });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
