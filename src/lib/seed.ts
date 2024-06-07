import { getAllModels, getModelFromName } from '@/lib/scraper';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

await prisma.$connect();

const models = await getAllModels();

const result = await Promise.all(models.map(async name => {
  const model = await getModelFromName({ name });
  await prisma.model.upsert({
    where: {
      name: model.name
    },
    update: model,
    create: model
  });
}));

await prisma.$disconnect();

console.log(`🌱 ${result.length} models seeded.`);