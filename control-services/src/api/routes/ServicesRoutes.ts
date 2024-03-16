import { NextFunction, Response, Request, Router } from "express";
import { Routes } from "../../interfaces/IRoutes";
import { validateRequest, validateRequestQuery } from "../middlewares/validateRequest";
import { handleError } from "../../utils/errorHandler";

import Joi from "joi";
import { ServicesController } from "../controllers/ServicesController";

export class ServicesRoutes implements Routes {
  public router = Router();
  public servicesController: ServicesController = new ServicesController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.get(
      "/services",
      handleError((req: Request, res: Response, next: NextFunction) => this.servicesController.getServices(req, res, next))
    );

    this.router.get(
      "/service/:id",
      validateRequestQuery(
        Joi.object({
          id: Joi.number().required(),
        })
      ),
      handleError((req: Request, res: Response, next: NextFunction) => this.servicesController.getServiceById(req, res, next))
    );

    this.router.post(
      "/add-service",
      validateRequest(
        Joi.object({
          name: Joi.string().required(),
          category: Joi.string().required(),
          price: Joi.number().required(),
          description: Joi.string().required(),
          createdById: Joi.number().required(),
          updatedById: Joi.number().required(),
        })
      ),
      handleError((req: Request, res: Response, next: NextFunction) => this.servicesController.addService(req, res, next))
    );

    this.router.put(
      "/update-service",
      validateRequest(
        Joi.object({
          id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
          newServiceData: Joi.object().required(),
        })
      ),
      handleError((req: Request, res: Response, next: NextFunction) => this.servicesController.updateService(req, res, next))
    );

    this.router.delete(
      "/delete-service",
      validateRequest(
        Joi.object({
          id: Joi.number().required(),
        })
      ),
      handleError((req: Request, res: Response, next: NextFunction) => this.servicesController.deleteService(req, res, next))
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
