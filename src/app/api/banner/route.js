// GET /api/banner
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
  const banners = await prisma.banner.findMany({
    orderBy: { sortOrder: 'asc' },
    
  });

  return NextResponse.json(banners);
}
