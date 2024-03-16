import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/AuthService";
import { NewUser, User } from "../../types/User";

import Container from "typedi";

export class AuthController {
  public authService: AuthService = Container.get(AuthService);

  public async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const newUser: NewUser = req.body;

    await this.authService.registerUser(newUser);

    res.status(201).json({ message: "User created successfully." });
  }

  public async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;
    const { user, token }: { user: User; token: string } = await this.authService.loginUser(email, password);

    res.cookie("session_token", token, {
      maxAge: 1200545345345345,
      httpOnly: true,
      sameSite: "none",
      secure: false,
    });

    res.status(200).json({
      message: "Logged in successfully.",
      data: { ...user, token, password: "" },
    });
  }

  public async logoutUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const sessionToken = req.cookies["session_token"];

    await this.authService.logoutUser(sessionToken);

    res.clearCookie("session_token");
    res.status(200).json({ message: "Logged out successfully." });
  }
}
