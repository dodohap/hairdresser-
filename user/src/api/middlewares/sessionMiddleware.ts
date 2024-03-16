import { UserSessionService } from "../../services/redis/UserSessionService";
import { Request, Response, NextFunction } from "express";
import { validateBody } from "./validateRequest";

import Joi from "joi";
import logger from "../../utils/logger";
import Container from "typedi";
import { InvalidSessionError } from "../../errors/AuthErrors";
import { PrismaClient } from "@prisma/client";

const userSessionService = Container.get(UserSessionService);
const users = new PrismaClient().user;

export const checkSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies["session_token"];
    const isSessionValid = await userSessionService.checkUserSession(sessionToken);

    if (!isSessionValid) {
      res.clearCookie("session_token");
      throw new InvalidSessionError();
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const checkSessionAndSetUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies["session_token"];
    const isSessionValid = await userSessionService.checkUserSession(sessionToken);

    if (!isSessionValid) {
      res.clearCookie("session_token");
      throw new InvalidSessionError();
    }
    const userData = await users.findUnique({
      where: {
        id: isSessionValid.userId,
      },
    });

    res.json({ user: userData });
    logger.info(`[CheckSessionAndSetUserData] User data sent. User: ${userData?.firstName} ${userData?.lastName} ${userData?.email}`);
    next();
  } catch (error) {
    next(error);
  }
};

export async function checkSessionWithRole(req: Request, res: Response, next: NextFunction) {
  const { userId, role, authKey } = validateBody(
    Joi.object({
      userId: Joi.string().required(),
      role: Joi.string().required(),
      authKey: Joi.string().required(),
    }),
    req.body
  );

  const isSessionValid = await userSessionService.checkUserSession(authKey, role);
  if (!isSessionValid) {
    res.clearCookie("session_token");
    throw new InvalidSessionError();
  }

  next();
}
