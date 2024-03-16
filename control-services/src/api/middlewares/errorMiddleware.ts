import e, { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import { ServerError } from "../../errors/ServerError";
import logger from "../../utils/logger";

export function errorHandler(error: Error | ServerError, req: Request, res: Response, next: NextFunction): void {
  let errorResponse = {
    code: "UNEXPECTED_ERROR",
    message: "An unexpected error occurred. Please try again later.",
    status: 500,
  };

  if (error instanceof ServerError) {
    logger.error(error.loggerMessage);
    errorResponse.code = error.constructor.name;
    errorResponse.message = error.message;
    errorResponse.status = error.status;
  } else if (error.name === "ValidationError" && error instanceof ValidationError) {
    logger.error(`Validation error: ${error.message} - ${req.method} ${req.path}`);
    const messages = error.details.map((detail) => detail.message).join(", ");
    errorResponse.code = error.constructor.name;
    errorResponse.message = `Validation error: ${messages}`;
    errorResponse.status = 400;
  } else {
    logger.error(`Unexpected error: ${error.message} - ${req.method} ${req.path}`);
  }

  res.status(errorResponse.status).json({ error: errorResponse });
}
