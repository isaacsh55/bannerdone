// PATCH /api/admin/banner/:id
import { PrismaClient } from '@prisma/client';
import cloudinary from 'src/lib/cloudinary';

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
  const { id } = params;
  const body = await req.json();

  // Build update object from defined fields only
  const updateData = {
    ...(body.title !== undefined && { title: body.title }),
    ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
    ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
    ...(body.isActive !== undefined && { isActive: body.isActive }),
  };

  const updated = await prisma.banner.update({
    where: { id },
    data: updateData,
  });

  return Response.json(updated);
}

// DELETE /api/admin/banner/:id
export async function DELETE(req, { params }) {
  const { id } = params;

  // // Optional: soft delete with isActive = false
  // const deleted = await prisma.banner.delete({
  //   where: { id },
  // });

  // return Response.json({ success: true, deleted });
  try {
    // 1. Get banner to retrieve Cloudinary publicId
    const banner = await prisma.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      return Response.json({ message: 'Banner not found' }, { status: 404 });
    }

    // 2. Delete from Cloudinary
    await cloudinary.uploader.destroy(banner.publicId);

    // 3. Delete from DB
    const deleted = await prisma.banner.delete({
      where: { id },
    });

    return Response.json({ success: true, deleted });
  } catch (error) {
    console.error('[DELETE_BANNER_ERROR]', error);
    return Response.json({ message: 'Delete failed' }, { status: 500 });
  }
}