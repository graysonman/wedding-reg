import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const registryItems = await prisma.registryItem.findMany();
      res.status(200).json(registryItems);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving registry items', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
