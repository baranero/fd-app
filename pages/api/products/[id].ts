import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await serverAuth(req, res);

    if (req.method === 'PUT') {
      const { id } = req.query;
      const { name, manufacturer, model, price } = req.body;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      const updateData: { name?: string; manufacturer?: string; model?: string; price?: number } = {};

      if (name) updateData.name = name;
      if (manufacturer) updateData.manufacturer = manufacturer;
      if (model) updateData.model = model;
      if (price) updateData.price = price;

      console.log(`Updating product with id: ${id}`, updateData);

      try {
        const updatedProduct = await prismadb.products.update({
          where: { id },
          data: updateData,
        });
        return res.status(200).json(updatedProduct);
      } catch (updateError) {
        console.error('Error updating product:', updateError);
        return res.status(500).json({ error: 'Failed to update product' });
      }
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      console.log(`Deleting product with id: ${id}`);

      try {
        await prismadb.products.delete({
          where: { id },
        });
        return res.status(200).json({ message: 'Product deleted successfully' });
      } catch (deleteError) {
        console.error('Error deleting product:', deleteError);
        return res.status(500).json({ error: 'Failed to delete product' });
      }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
