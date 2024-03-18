import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, pplCount } = req.body;
    try {
      const newRSVP = await prisma.RSVP.create({
        data: {
          name,
          pplCount,
        },
      });
      res.status(200).json(newRSVP);
    } catch (error) {
      console.error('Failed to save RSVP:', error);
      res.status(500).json({ message: 'Failed to save RSVP' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
