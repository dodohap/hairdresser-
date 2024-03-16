import { PrismaClient } from "@prisma/client";
import { NewUser, User } from "../types/User";
import { Service, Container } from "typedi";
import { UserSessionService } from "./redis/UserSessionService";
import { AccountActivationService } from "./redis/AccountActivationService";
import { sendEmail } from "../utils/sendEmail";

import bcrypt from "bcrypt";
import { AccountNotActivatedError, InvalidCredentialsError, UserAlreadyExistsError } from "../errors/AuthErrors";
import { hashPassword } from "../utils/hashPassword";
import logger from "../utils/logger";

@Service()
export class AuthService {
  private prismaClient = new PrismaClient();
  private userSessionService = Container.get(UserSessionService);
  private accountActivationService = Container.get(AccountActivationService);

  async registerUser(newUser: NewUser): Promise<boolean> {
    const userExist: User | null = await this.prismaClient.user.findUnique({
      where: {
        email: newUser.email,
      },
    });
    if (userExist) throw new UserAlreadyExistsError();

    const hashedPassword = await hashPassword(newUser.password);
    const user: NewUser = {
      ...newUser,
      password: hashedPassword,
    };

    const acctivationKey = await this.accountActivationService.createAccountActivationKey(user);

    const emailSubject = "Aktywacja konta";
    const emailData = `Dziekujemy za rejestracje. Twoj kod aktywacyjny to: ${acctivationKey}`;

    await sendEmail(user.email, emailSubject, emailData, "");

    logger.info(`[AuthService] User registered and created. User: ${{ ...user, password: "*****" }}`);
    return true;
  }

  async loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
    const user: User | null = await this.prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new InvalidCredentialsError();
    if (!user.isAccountActive) throw new AccountNotActivatedError();

    const passwordMatch: boolean = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new InvalidCredentialsError();

    const token = await this.userSessionService.createUserSession(user);

    logger.info(`[AuthService] User logged in. UserEmail: ${user.email}`);
    return { user, token };
  }

  async logoutUser(key: string | number): Promise<boolean> {
    await this.userSessionService.deleteUserSession(key);

    logger.info(`[AuthService] User logged out. UserId: ${key}`);
    return true;
  }
}
