import { writeFile } from 'fs/promises';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');
    const title = formData.get('title')?.toString() || '';
    const sortOrderRaw = formData.get('sortOrder')?.toString() || '0';
    const isActiveRaw = formData.get('isActive')?.toString() || 'false';

    const sortOrder = parseInt(sortOrderRaw, 10);
    const isActive = isActiveRaw === 'true';

    if (!file || typeof file === 'string') {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;
    const bannersDir = path.join(process.cwd(), 'public/banners');
    const filePath = path.join(bannersDir, fileName);

    await writeFile(filePath, buffer);

    const imageUrl = `/banners/${fileName}`;

    await prisma.banner.create({
      data: {
        title,
        sortOrder,
        isActive,
        imageUrl,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[UPLOAD_ERROR]', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
