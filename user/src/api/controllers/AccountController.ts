import { Request, Response, NextFunction } from "express";
import { AccountService } from "../../services/AccountService";
import { User } from "../../types/User";

import Container from "typedi";

export class AccountController {
  private accountService: AccountService = Container.get(AccountService);

  async getAllActiveAccounts(req: Request, res: Response, next: NextFunction): Promise<void> {
    const users = await this.accountService.getAllActiveAccounts();

    res.status(200).json({ users });
  }

  async activateAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { key } = req.body;

    await this.accountService.activateAccount(String(key));

    res.status(200).json({ message: "Account activated successfully." });
  }

  async updateUserDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId, password, newUserData } = req.body;

    const user: User = await this.accountService.updateUserDetails(Number(userId), String(password), newUserData);

    res.status(200).json({ message: "User data changed successfully.", user: user });
  }

  async generateResetPasswordLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body;

    await this.accountService.generateResetPasswordLink(email);

    res.status(200).json({ message: "Password reset link generated successfully." });
  }

  async resetPasswordByLink(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId, key, newPassword } = req.body;

    await this.accountService.resetPasswordByLink(key, newPassword);

    res.status(200).json({ message: "Password reset successfully by email." });
  }
}
