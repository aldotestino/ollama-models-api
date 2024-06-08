import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import prisma from "@/lib/db";
import { createApiError } from "@/lib/errors";
import { StatusCodes } from "http-status-codes";
import { errorSchema, getModelByNameQuerySchema, modelSchema } from "./models.schema";

const modelsPlugin: FastifyPluginCallbackZod = (fastify, _, done) => {

  fastify.get("/:first/:second", {
    schema: {
      description: "Get a model by name",
      tags: ["models"],
      params: getModelByNameQuerySchema,
      response: {
        200: modelSchema,
        404: errorSchema,
        500: errorSchema
      }
    }
  }, async (req, res) => {

    const fullModelName = req.params.second ? `${req.params.first}/${req.params.second}` : req.params.first;

    const model = await prisma.model.findUnique({
      where: {
        name: fullModelName
      }
    });

    if (!model) {
      return createApiError(res, StatusCodes.NOT_FOUND, "Model not found");
    }

    return model;
  })

  done();
}

export default modelsPlugin;