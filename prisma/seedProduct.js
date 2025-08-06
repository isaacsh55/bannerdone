// prisma/seedproduct.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1) Seed Products
  const productsData = [
    // Packages
    { name: 'Dual Meal',        description: 'Dual options for Lunch & Dinner',    type: 'PACKAGE', price: 0 },
    { name: 'Single Meal',      description: 'Single meal for Lunch or Dinner',     type: 'PACKAGE', price: 0 },
    { name: 'Trial Meal',       description: '1-day trial meal',                    type: 'PACKAGE', price: 0 },

    // Add-ons & Bundles
    { name: "Pig's Trotter",               description: 'Pork trotters with ginger vinegar and egg', type: 'ADDON',          price: 0 },
    { name: 'Papaya Soup',                  description: 'Milk boosting fish and papaya soup',       type: 'ADDON',          price: 0 },
    { name: "Homemade Bird's Nest",        description: 'Delicate bird nest dessert',                type: 'ADDON',          price: 0 },
    { name: 'Comforting Set',               description: '1 each of the 3 add-ons',                   type: 'ADDON_BUNDLE',   price: 32 },
    { name: 'Thermal Flask',                description: '600ml stainless steel flask',               type: 'ADDON',          price: 0 },
    { name: 'BMB Massage Package',          description: 'Basic massage for 28-day Dual Meal only',   type: 'PARTNER_BUNDLE', price: 3268 },
    { name: 'MyQueen Staycay Package',      description: '2D1N Oasia stay‑cay for Trial Meal',        type: 'PARTNER_BUNDLE', price: 399 }
  ];

  await prisma.product.createMany({
    data: productsData.map(p => ({
      name:        p.name,
      description: p.description,
      type:        p.type,
      price:       p.price,
      visible:     true,
    })),
    skipDuplicates: true,
  });

  // Fetch back all products to build a name → record map
  const allProducts = await prisma.product.findMany();
  const byName = Object.fromEntries(allProducts.map(p => [p.name, p]));

  // 2) Seed ProductOption rows
  const optionRows = [];

  // Package durations
  const pkgDurations = {
    'Dual Meal':   [ { days: 28, price: 1768 }, { days: 21, price: 1368 }, { days: 14, price: 968 }, { days: 7, price: 498 } ],
    'Single Meal': [ { days: 28, price: 968  }, { days: 21, price: 728  }, { days: 14, price: 498 } ],
    'Trial Meal':  [ { days: 1,  price: 38  } ],
  };

  for (const [pkgName, opts] of Object.entries(pkgDurations)) {
    const pkg = byName[pkgName];
    for (const o of opts) {
      optionRows.push({
        productId: pkg.product_id,
        type:      'PACKAGE_DURATION',
        label:     `${o.days} Days`,
        value:     o.days,
        price:     o.price,
      });
    }
  }

  // Add-on servings and bundles
  const addonDefs = [
    { name: "Pig's Trotter",            durations: [1,3,5], prices: [12,35,55] },
    { name: 'Papaya Soup',                durations: [1,3,5], prices: [7,20,32]  },
    { name: "Homemade Bird's Nest",      durations: [1,3,5], prices: [15,42,66] },
    { name: 'Comforting Set',             durations: [1],      prices: [32],      bundle: true },
    { name: 'Thermal Flask',              durations: [1],      prices: [10] },
    { name: 'BMB Massage Package',        durations: [1],      prices: [3268],   bundle: true },
    { name: 'MyQueen Staycay Package',    durations: [1],      prices: [399],    bundle: true },
  ];

  for (const ad of addonDefs) {
    const prod = byName[ad.name];
    for (let i = 0; i < ad.durations.length; i++) {
      const days = ad.durations[i];
      const price = ad.prices[i];
      const type = ad.bundle ? 'ADDON_BUNDLE' : 'ADDON_SERVING';

      optionRows.push({
        productId: prod.product_id,
        type,
        label:    type === 'ADDON_SERVING' ? `${days} Servings` : ad.name,
        value:    days,
        price,
      });
    }
  }

  await prisma.productOption.createMany({
    data: optionRows,
    skipDuplicates: true,
  });

  // 3) Seed ProductComponent (links)
  const components = [];

  // General add-ons for all packages
  const pkgNames = ['Dual Meal', 'Single Meal', 'Trial Meal'];
  const generalAddOns = [
    "Pig's Trotter",
    'Papaya Soup',
    "Homemade Bird's Nest",
    'Comforting Set',
    'Thermal Flask',
  ];

  for (const pkgName of pkgNames) {
    const pkg = byName[pkgName];
    for (const addName of generalAddOns) {
      const add = byName[addName];
      components.push({ parent_id: pkg.product_id, component_id: add.product_id });
    }
  }

  // BMB Massage → only Dual Meal
  components.push({
    parent_id:    byName['Dual Meal'].product_id,
    component_id: byName['BMB Massage Package'].product_id,
  });

  // MyQueen Staycay → only Trial Meal
  components.push({
    parent_id:    byName['Trial Meal'].product_id,
    component_id: byName['MyQueen Staycay Package'].product_id,
  });

  await prisma.productComponent.createMany({
    data: components,
    skipDuplicates: true,
  });

  console.log('🎉 Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
