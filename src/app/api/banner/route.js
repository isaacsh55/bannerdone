// GET /api/banner
import { PrismaClient } from '@prisma/client';
import { isActive } from '@tiptap/core';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
  const banners = await prisma.banner.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' }, 
    select: { id: true, title: true, imageUrl: true, isActive: true, sortOrder: true }, 
  });

  return NextResponse.json(banners);
}
