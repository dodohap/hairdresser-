import { createKey, deleteKey, getKey } from "../../utils/redisClient";
import { Service } from "typedi";
import logger from "../../utils/logger";

@Service()
export class PasswordResetService {
  private readonly PASSWORD_RESET_KEY_EXPIRATION = 60 * 5; // 5 minutes
  private readonly PASSWORD_RESET_KEY_PREFIX = "password_reset_key-";

  private resetPasswordKey(key: string | number) {
    return `${this.PASSWORD_RESET_KEY_PREFIX}${key}`;
  }

  async createPasswordResetKey(userId: string | number): Promise<string> {
    const key = Math.floor(100000 + Math.random() * 900000);

    await createKey(this.resetPasswordKey(key), String(userId), this.PASSWORD_RESET_KEY_EXPIRATION);

    logger.info(`Created password reset key for user ${userId}. Key: ${key}`);

    return String(key);
  }

  async checkPasswordResetKey(key: string): Promise<number | string | null> {
    const result = await getKey(this.resetPasswordKey(key));
    if (!result) return null;

    logger.info(`Checked password reset key for user ${result}. Result: true`);

    return result;
  }

  async deletePasswordResetKey(key: string | number): Promise<void> {
    await deleteKey(this.resetPasswordKey(key));
    logger.info(`Deleted password reset key ${key}.`);
  }
}
