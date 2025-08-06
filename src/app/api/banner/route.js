// GET /api/banner-list
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensures the response is not cached

const prisma = new PrismaClient();

export async function GET(req) {
  const banners = await prisma.banner.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json(banners);
}
