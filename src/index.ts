import { PrismaClient } from "@prisma/client";

const primsa = new PrismaClient();

const firstModels = await primsa.model.findMany({
  orderBy: {
    featPosition: 'asc'
  },
  take: 5,
  select: {
    featPosition: true,
    name: true,
    family: true,
    description: true
  }
})

console.log(firstModels);