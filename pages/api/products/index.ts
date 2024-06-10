import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await serverAuth(req, res);

    if (req.method === 'GET') {
      const products = await prismadb.products.findMany();
      const warehouses = await prismadb.warehouse.findMany();

      const productsWithQuantitiesAndValues = products.map((product, index) => {
        const productWarehouses = warehouses.filter(warehouse => warehouse.productId === product.id);
        const quantity = productWarehouses.reduce((acc, warehouse) => acc + warehouse.quantity, 0);
        const totalValue = quantity * product.price;

        return {
          ...product,
          index: index + 1, // Dodaj numer porządkowy
          quantity,
          totalValue,
        };
      });

      return res.status(200).json(productsWithQuantitiesAndValues);
    }

    if (req.method === 'POST') {
      const { name, manufacturer, model, price } = req.body;

      if (!name || !manufacturer || !model || typeof price !== 'number') {
        return res.status(400).json({ error: 'Missing required fields or invalid data' });
      }

      const existingProduct = await prismadb.products.findFirst({
        where: { name, manufacturer, model },
      });

      if (existingProduct) {
        if (existingProduct.price === price) {
          return res.status(409).json({ error: 'Product already exists with the same price' });
        }

        const updatedProduct = await prismadb.products.update({
          where: { id: existingProduct.id },
          data: { price },
        });

        return res.status(200).json(updatedProduct);
      }

      const newProduct = await prismadb.products.create({
        data: {
          name,
          manufacturer,
          model,
          price,
        },
      });

      return res.status(201).json(newProduct);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
