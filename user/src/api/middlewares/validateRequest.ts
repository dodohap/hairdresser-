import { Response, Request, NextFunction } from "express";
import { ServerError } from "../../errors/ServerError";

import Joi from "joi";

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    console.log(req.body);
    if (error) {
      next(new ServerError(400, error.message));
    } else {
      next();
    }
  };
};

export const validateRequestQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query);
    if (error) {
      next(new ServerError(400, error.message));
    } else {
      next();
    }
  };
};

export const validateBody = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data);
  if (error) throw new ServerError(400, error.message);

  return value;
};
