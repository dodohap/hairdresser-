import { createKey, deleteKey, redisClient } from "../../utils/redisClient";
import { Service } from "typedi";
import { User, UserSession } from "../../types/User";

import crypto from "crypto";
import logger from "../../utils/logger";
import { UserDoesNotExistError } from "../../errors/AuthErrors";

@Service()
export class UserSessionService {
  private USER_SESSION_KEY_EXPIRATION = 60 * 60 * 1; // 1 hours
  private USER_SESSION_KEY_PREFIX = "user_session-";

  private sessionKey = (key: number | string) => `${this.USER_SESSION_KEY_PREFIX}${key}`;

  async createUserSession(user: User): Promise<string> {
    if (!user) throw new UserDoesNotExistError();

    const authKey = crypto.randomUUID();
    const sessionKey = this.sessionKey(authKey);
    const sessionValue = JSON.stringify({ userId: user.id, role: user.role });

    await createKey(sessionKey, sessionValue, this.USER_SESSION_KEY_EXPIRATION);

    logger.info(`Session create id: ${user.id}, email: ${user.email}, role: ${user.role}.`);

    return authKey;
  }

  async checkUserSession(sessionKeyToCheck: string, expectedRole?: string): Promise<UserSession | null> {
    const sessionKey = this.sessionKey(sessionKeyToCheck);
    const sessionValue = await redisClient.get(sessionKey);
    if (!sessionValue) return null;

    const { userId, role } = JSON.parse(sessionValue);
    // const isRoleValid = !expectedRole || expectedRole === role;
    // const result: boolean = expectedRole !== undefined && isRoleValid;

    logger.info(`[CheckUserSession] Check session for user with id: ${userId}. Result: ${sessionValue ? "valid" : "invalid"}.`);

    return { userId, role };
  }

  async deleteUserSession(key: string | number): Promise<void> {
    const sessionKey = this.sessionKey(key);

    await deleteKey(sessionKey);

    logger.info(`Remove session key: ${key}.`);
  }
}
