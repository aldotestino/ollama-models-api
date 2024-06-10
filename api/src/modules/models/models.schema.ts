import * as z from 'zod';

const getModelByNameParamsSchema = z.object({
  first: z.string().describe("The name of the model or the publisher using the format 'publisher/model'"),
  second: z.string().optional().describe("The name of the model using the format 'publisher/model'")
});

const searchModelsQuerySchema = z.object({
  q: z.string().default("").describe("The search query"),
  p: z.coerce.number().min(1).default(1).describe("The page number"),
  n: z.coerce.number().min(1).max(50).default(10).describe("The number of items per page"),
});

const tagSchema = z.object({
  name: z.string(),
  size: z.string(),
});

const baseModelSchema = z.object({
  id: z.string(),
  featPosition: z.number(),
  name: z.string(),
  description: z.string(),
  pulls: z.string(),
  lastUpdate: z.string(),
  family: z.string(),
  system: z.string()
});

const modelSchema = baseModelSchema.extend({
  primaryTags: z.array(tagSchema),
  secondaryTags: z.array(tagSchema)
});

const searchModelResponseSchema = z.object({
  total: z.number(),
  pages: z.number(),
  nextPage: z.number().nullable(),
  prevPage: z.number().nullable(),
  models: z.array(baseModelSchema)
});

const errorSchema = z.object({
  error: z.string()
});

export {
  getModelByNameParamsSchema,
  searchModelsQuerySchema,
  modelSchema,
  searchModelResponseSchema,
  errorSchema
}