const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Step 1: Hash the password
  const rawPassword = 'Cp#4dm!n';
  const passwordHash = await bcrypt.hash(rawPassword, 10); // 10 salt rounds

  // Step 2: Create or update admin with hashed password
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@cpconfinement.com.sg' },
    update: {
      passwordHash,
    },
    create: {
      name: 'Super Admin',
      email: 'admin@cpconfinement.com.sg',
      passwordHash,
      role: 'SUPERADMIN',
    },
  });

  // Step 3: Seed banners created by this admin
  await prisma.banner.createMany({
    data: [
      {
        imageUrl: '/banners/Confinement_Banner_1.jpg',
        title: 'Confinement Banner 1',
        sortOrder: 1,
        isActive: true,
        createdById: admin.id,
      },
      {
        imageUrl: '/banners/Confinement_Banner_2.png',
        title: 'Confinement Banner 2',
        sortOrder: 2,
        isActive: true,
        createdById: admin.id,
      },
      {
        imageUrl: '/banners/Confinement_Banner_3.jpg',
        title: 'Confinement Banner 3',
        sortOrder: 3,
        isActive: true,
        createdById: admin.id,
      },
    ],
  });

  console.log('✅ Seed data inserted.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
