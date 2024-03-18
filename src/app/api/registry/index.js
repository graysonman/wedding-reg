import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const registryItems = await prisma.registry.findMany();
      res.status(200).json(registryItems);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving registry items', error: error.message });
    }
  } else if (req.method === 'POST') {
    const { id, famBought } = req.body;
    try {
      const registryItem = await prisma.registry.update({
        where: { id },
        data: { famBought, bought: true }, 
      });
      res.status(200).json(registryItem);
    } catch (error) {
      res.status(500).json({ message: 'Error confirming purchase', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
