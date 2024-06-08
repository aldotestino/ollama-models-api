import type { Server } from "http";
import type { FastifyBaseLogger, FastifyHttpOptions } from "fastify";
import Fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import apiDocsPlugin from "./lib/api-docs";
import { errorHandler } from "./lib/errors";
import modelsPlugin from "./modules/models/models.plugin";

export function createApi(fastifyOpts: FastifyHttpOptions<Server, FastifyBaseLogger>) {
  const fastify = Fastify(fastifyOpts);

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.register(apiDocsPlugin);

  fastify.register(modelsPlugin, { prefix: "/api/v1/models" })

  fastify.setErrorHandler(errorHandler);

  return fastify;
}