import { createKey, deleteKey, getKey } from "../../utils/redisClient";
import { Service } from "typedi";
import logger from "../../utils/logger";
import { NewUser } from "../../types/User";

@Service()
export class AccountActivationService {
  private readonly ACCOUNT_ACTIVATION_KEY_PREFIX = "account_activation_key-";

  private accountKey(key: number | string) {
    return `${this.ACCOUNT_ACTIVATION_KEY_PREFIX}${key}`;
  }

  async createAccountActivationKey(newUser: NewUser): Promise<string> {
    const key = Math.floor(100000 + Math.random() * 900000);
    const accountActivationUser = JSON.stringify(newUser);

    await createKey(this.accountKey(key), accountActivationUser);

    logger.info(`Created account activation key for user with email: ${newUser.email}. Key: ${this.accountKey(key)}`);

    return String(key);
  }

  async checkAccountActivationKey(key: string): Promise<NewUser | null> {
    const result = await getKey(this.accountKey(key));
    if (!result) return null;

    const newUser: NewUser = JSON.parse(result);
    logger.info(`Checked account activation key: ${key}, found user: ${newUser.email}`);

    return newUser;
  }

  async deleteAccountActivationKey(key: string): Promise<void> {
    await deleteKey(this.accountKey(key));
    logger.info(`Deleted account activation key: ${key}.`);
  }
}
