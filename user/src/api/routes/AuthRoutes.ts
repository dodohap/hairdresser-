import { NextFunction, Response, Request, Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { Routes } from "../../interfaces/IRoutes";
import { validateRequest } from "../middlewares/validateRequest";
import { checkSession } from "../middlewares/sessionMiddleware";
import { handleError } from "../../utils/errorHandler";

import Joi from "joi";

export class AuthRoutes implements Routes {
  public router = Router();
  public authController: AuthController = new AuthController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.post(
      "/register",
      validateRequest(
        Joi.object({
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          email: Joi.string().email().required(),
          phoneNumber: Joi.string()
            .pattern(/^[0-9]{9}$/, "numbers")
            .required(),
          password: Joi.string().min(6).required(),
        })
      ),
      handleError((req: Request, res: Response, next: NextFunction) => this.authController.registerUser(req, res, next))
    );

    this.router.post(
      "/login",
      validateRequest(
        Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
        })
      ),
      handleError((req: Request, res: Response, next: NextFunction) => this.authController.loginUser(req, res, next))
    );

    this.router.post(
      "/logout",
      checkSession,
      handleError((req: Request, res: Response, next: NextFunction) => this.authController.logoutUser(req, res, next))
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
