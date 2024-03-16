import { NextFunction, Response, Request, Router } from "express";
import { Routes } from "../../interfaces/IRoutes";
import { validateRequest } from "../middlewares/validateRequest";
import { checkSession, checkSessionAndSetUserData, checkSessionWithRole } from "../middlewares/sessionMiddleware";
import { AccountController } from "../controllers/AccountController";
import { handleError } from "../../utils/errorHandler";

import Joi from "joi";

export class AccountRoutes implements Routes {
  public router = Router();
  public accountController: AccountController = new AccountController();

  constructor() {
    this.init();
  }

  private init() {
    this.router.get(
      "/get-all-active-accounts",
      checkSessionWithRole,
      handleError((req: Request, res: Response, next: NextFunction) => this.accountController.getAllActiveAccounts(req, res, next))
    );

    this.router.get("/get-user", checkSessionAndSetUserData);

    this.router.post(
      "/activate-account",
      validateRequest(
        Joi.object({
          key: Joi.string().required(),
        })
      ),
      handleError((req: Request, res: Response, next: NextFunction) => this.accountController.activateAccount(req, res, next))
    );

    this.router.put(
      "/change-user-data",
      checkSession,
      validateRequest(
        Joi.object({
          userId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
          password: Joi.string().required(),
          newUserData: Joi.object().required(),
        })
      ),
      handleError((req: Request, res: Response, next: NextFunction) => {
        this.accountController.updateUserDetails(req, res, next);
      })
    );

    this.router.post(
      "/generate-reset-password-link",
      validateRequest(
        Joi.object({
          email: Joi.string().email().required(),
        })
      ),
      handleError((req: Request, res: Response, next: NextFunction) => this.accountController.generateResetPasswordLink(req, res, next))
    );

    this.router.post(
      "/reset-password",
      validateRequest(
        Joi.object({
          key: Joi.string().required(),
          newPassword: Joi.string().required(),
        })
      ),
      handleError((req: Request, res: Response, next: NextFunction) => this.accountController.resetPasswordByLink(req, res, next))
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
