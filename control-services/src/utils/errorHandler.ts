import { Request, Response, NextFunction } from "express";

export const handleError = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    next(error);
  });
};
