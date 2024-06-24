import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
// import scalarApiReference from "@scalar/fastify-api-reference";
import fastifySwaggerUI from "@fastify/swagger-ui";

const apiDocsPlugin = fp((fastify, _, done) => {

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

  // fastify.register(scalarApiReference, {
  //   routePrefix: "/docs"
  // });

  fastify.register(fastifySwaggerUI, {
    routePrefix: "/docs",
    theme: {
      title: "Ollama Models API - Docs",
    }
  });

  done();
});

export default apiDocsPlugin;