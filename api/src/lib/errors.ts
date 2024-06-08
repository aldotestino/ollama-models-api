import type { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export function createApiError(rep: FastifyReply, statusCode: StatusCodes, errorMessage: string) {
  rep.code(statusCode).send({
    error: errorMessage
  });
  return rep;
}

function zodErrorsToString(error: ZodError) {
  return Object.values(error.flatten().fieldErrors).join(", ");
}

export function errorHandler(err: Error, req: FastifyRequest, rep: FastifyReply) {

  // Check for validation error
  if (err instanceof ZodError) {
    rep.code(StatusCodes.BAD_REQUEST);
    return {
      error: zodErrorsToString(err)
    };
  }

  // Internal Server Error
  rep.log.error({
    method: req.method,
    url: req.url,
    errorMessage: err.message
  });

  rep.code(StatusCodes.INTERNAL_SERVER_ERROR);
  return {
    error: err.message
  };
}