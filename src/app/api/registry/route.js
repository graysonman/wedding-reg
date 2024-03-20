import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();

export async function GET() {
  try {
    const registryItems = await prisma.registry.findMany({
      orderBy:{
        bought: 'asc'
      }
    });
    return NextResponse.json(registryItems);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error retrieving registry items', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { id, famBought } = await req.json(); // Assuming JSON payload
  try {
    const registryItem = await prisma.registry.update({
      where: { id },
      data: { famBought, bought: true },
    });
    return NextResponse.json(registryItem);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error confirming purchase', error: error.message },
      { status: 500 }
    );
  }
}