import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import prisma from "@/lib/db";
import { createApiError } from "@/lib/errors";
import { StatusCodes } from "http-status-codes";
import { errorSchema, getModelByNameParamsSchema, modelSchema, searchModelResponseSchema, searchModelsQuerySchema } from "./models.schema";

const modelsPlugin: FastifyPluginCallbackZod = (fastify, _, done) => {

  fastify.get("/:first/:second?", {
    schema: {
      description: "Get a model by name",
      tags: ["models"],
      params: getModelByNameParamsSchema,
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
  });

  fastify.get("/search", {
    schema: {
      description: "Search for models",
      tags: ["models"],
      querystring: searchModelsQuerySchema,
      response: {
        200: searchModelResponseSchema,
        500: errorSchema
      }
    }
  }, async (req) => {

    const query = req.query.q;
    const page = req.query.p;
    const number = req.query.n;

    const modelsLength = await prisma.model.count({
      where: {
        name: {
          contains: query || ""
        }
      }
    });

    const models = await prisma.model.findMany({
      where: {
        name: {
          contains: query || ""
        }
      },
      select: {
        id: true,
        featPosition: true,
        name: true,
        description: true,
        pulls: true,
        lastUpdate: true,
        family: true,
        system: true
      },
      skip: (page - 1) * number,
      take: number,
      orderBy: {
        featPosition: "asc"
      }
    });

    const pages = Math.ceil(modelsLength / number);
    const nextPage = page < pages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return {
      total: modelsLength,
      pages,
      nextPage,
      prevPage,
      models,
    };
  });

  done();
}

export default modelsPlugin;