import { getAllModels, getModelFromName } from './scraper';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

await prisma.$connect();

console.log('🗑️ Removing models...');
await prisma.model.deleteMany({});

console.log('📦 Getting models...');
const modelNames = await getAllModels();

console.log('📄 Getting full models information...')
const models = await Promise.all(modelNames.map(async (name, i) => {
  const model = await getModelFromName({ name });
  return { ...model, featPosition: i + 1 };
}));

console.log('🌱 Seeding models...');
const result = await prisma.model.createMany({
  data: models
});

await prisma.$disconnect();

console.log(`🌱 ${result.count} models seeded.`);