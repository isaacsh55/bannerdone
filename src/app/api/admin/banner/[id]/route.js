// PATCH /api/admin/banner/:id
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
  const { id } = params;
  const body = await req.json();

  // Optional: check if banner exists first
  const updated = await prisma.banner.update({
    where: { id },
    data: {
      title: body.title,
      imageUrl: body.imageUrl,
      sortOrder: body.sortOrder,
      isActive: body.isActive,
    },
  });

  return Response.json(updated);
}

// DELETE /api/admin/banner/:id
export async function DELETE(req, { params }) {
  const { id } = params;

  // Optional: soft delete with isActive = false
  const deleted = await prisma.banner.delete({
    where: { id },
  });

  return Response.json({ success: true, deleted });
}