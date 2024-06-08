import * as z from 'zod';

const getModelByNameQuerySchema = z.object({
  first: z.string().describe("The name of the model or the publisher using the format 'publisher/model'"),
  second: z.string().nullable().describe("The name of the model using the format 'publisher/model'")
});

const tagSchema = z.object({
  name: z.string(),
  size: z.string(),
});

const modelSchema = z.object({
  id: z.string(),
  featPosition: z.number(),
  name: z.string(),
  description: z.string(),
  pulls: z.string(),
  lastUpdate: z.string(),
  family: z.string(),
  system: z.string(),
  primaryTags: z.array(tagSchema),
  secondaryTags: z.array(tagSchema)
});

const errorSchema = z.object({
  error: z.string()
});

export {
  getModelByNameQuerySchema,
  modelSchema,
  errorSchema
}