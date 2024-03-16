import { Service, Container } from "typedi";
import { PrismaClient } from "@prisma/client";
import { AccountActivationService } from "./redis/AccountActivationService";
import { NewUser, User, UserUpdateData } from "../types/User";
import { PasswordResetService } from "./redis/PasswordResetService";
import { ServerError } from "../errors/ServerError";
import { sendEmail } from "../utils/sendEmail";

import bcrypt from "bcrypt";
import logger from "../utils/logger";
import { hashPassword } from "../utils/hashPassword";
import { InvalidCredentialsError, UserDoesNotExistError } from "../errors/AuthErrors";

@Service()
export class AccountService {
  private prismaClient = new PrismaClient();
  private accountActivationService = Container.get(AccountActivationService);
  private passwordResetService = Container.get(PasswordResetService);

  async getAllActiveAccounts(): Promise<User[]> {
    const users = await this.prismaClient.user.findMany({
      where: {
        isAccountActive: true,
      },
    });

    return users;
  }

  async activateAccount(key: string): Promise<boolean> {
    const newUser: NewUser | null = await this.accountActivationService.checkAccountActivationKey(key);
    if (!newUser) {
      logger.error(`[AccountService] Failed to activate user account. Invalid key: ${key}`);
      throw new InvalidCredentialsError();
    }

    const user: User = await this.prismaClient.user.create({
      data: {
        ...newUser,
        isAccountActive: true,
      },
    });

    if (!user) {
      logger.error(`[AccountService] Failed to activate user account. UserEmail: ${newUser.email}`);
      throw new ServerError();
    }

    await this.accountActivationService.deleteAccountActivationKey(key);
    logger.info(`[AccountService] User account activated. UserEmail: ${newUser.email}`);
    return true;
  }

  async updateUserDetails(userId: string | number, password: string, updateData: UserUpdateData): Promise<User> {
    const user = await this.prismaClient.user.findFirst({
      where: { id: Number(userId) },
    });
    if (!user) throw new UserDoesNotExistError();

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new InvalidCredentialsError();

    if (updateData.password) updateData.password = await hashPassword(updateData.password);

    const updatedUser = await this.prismaClient.user.update({
      where: { id: Number(userId) },
      data: { ...updateData },
    });

    if (!updatedUser) {
      logger.error(`[AccountService] Failed to change user data. UserId: ${userId}`);
      throw new ServerError();
    }

    logger.info(`[AccountService] User data changed successfully. UserId: ${userId}, new data: ${updateData}`);
    return updatedUser;
  }

  async generateResetPasswordLink(email: string): Promise<boolean> {
    const user = await this.prismaClient.user.findFirst({ where: { email } });
    if (!user) throw new InvalidCredentialsError();

    const resetKey = await this.passwordResetService.createPasswordResetKey(user.id);

    const emailSubject = "Password Reset";
    const resetLink = `Its your reset key: ${resetKey}`;

    await sendEmail(user.email, emailSubject, resetLink, "");

    logger.info(`[AccountService] Password reset link sent to: ${user.email}`);
    return true;
  }

  async resetPasswordByLink(key: string, newPassword: string): Promise<boolean> {
    const userId = await this.passwordResetService.checkPasswordResetKey(key);
    if (!userId) throw new InvalidCredentialsError();

    const hashedPassword = await hashPassword(newPassword);
    const updateResult = await this.prismaClient.user.update({
      where: { id: Number(userId) },
      data: { password: hashedPassword },
    });

    if (!updateResult) {
      logger.error(`[AccountService] Failed to change user data. UserID: ${userId}`);
      throw new ServerError();
    }

    this.passwordResetService.deletePasswordResetKey(userId);

    logger.info(`[AccountService] Password reset successfully by email. UserID: ${userId}`);
    return !!updateResult;
  }
}
