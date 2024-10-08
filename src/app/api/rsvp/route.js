import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();

export async function POST(req) {
  const { name, pplCount } = await req.json();

  try {
    const newRSVP = await prisma.rSVP.create({
      data: {
        name,
        pplCount,
      },
    });
    return NextResponse.json(newRSVP);
  } catch (error) {
    console.error('Failed to save RSVP:', error);
    return NextResponse.json(
      { message: 'Failed to save RSVP', error: error.message },
      { status: 500 }
    );
  }
}