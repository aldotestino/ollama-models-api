import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import scalarApiReference from "@scalar/fastify-api-reference";

// https://github.com/scalar/scalar/blob/main/documentation/fastify.md
// use 'fastify-plugin' (fp) otherwise this will not run in the correct context
const apiDocsPlugin = fp((fastify, _, done) => {

  // TODO: setup tags (app, fastapi)
  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Ollama Models API",
        description: "Documentation for the Ollama Models API",
        version: "1.0.0",
      }
    },
    transform: jsonSchemaTransform,
  });

  fastify.register(scalarApiReference, {
    routePrefix: "/docs"
  });

  done();
});

export default apiDocsPlugin;