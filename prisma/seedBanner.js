const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// Workaround: dynamically import ES module inside CommonJS
async function getCloudinary() {
  const mod = await import('../src/lib/cloudinary.js');
  return mod.default;
}

const prisma = new PrismaClient();

async function uploadImageToCloudinary(localPath, publicId) {
  const cloudinary = await getCloudinary();

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      localPath,
      {
        folder: 'banners',
        public_id: publicId,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
}

async function main() {
  const rawPassword = 'Cp#4dm!n';
  const passwordHash = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@cpconfinement.com.sg' },
    update: { passwordHash },
    create: {
      name: 'Super Admin',
      email: 'admin@cpconfinement.com.sg',
      passwordHash,
      role: 'SUPERADMIN',
    },
  });

  const bannersToSeed = [
    {
      file: 'Confinement_Banner_1.jpg',
      title: 'Confinement Banner 1',
      sortOrder: 1,
    },
    {
      file: 'Confinement_Banner_2.png',
      title: 'Confinement Banner 2',
      sortOrder: 2,
    },
    {
      file: 'Confinement_Banner_3.jpg',
      title: 'Confinement Banner 3',
      sortOrder: 3,
    },
  ];

  const seedData = [];

  for (const banner of bannersToSeed) {
    const filePath = path.join(__dirname, '../public/banners', banner.file);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Skipping ${banner.file} — file not found.`);
      continue;
    }

    const publicId = path.parse(banner.file).name;
    const result = await uploadImageToCloudinary(filePath, publicId);

    seedData.push({
      title: banner.title,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      sortOrder: banner.sortOrder,
      isActive: true,
      createdById: admin.id,
    });

    console.log(`✅ Uploaded ${banner.file} → ${result.secure_url}`);
  }

  await prisma.banner.createMany({ data: seedData });

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
