import { ServerError } from "./ServerError";

export class AccountNotActivatedError extends ServerError {
  constructor() {
    super(403, "Account not activated", "Attempt to log in with an inactive account");
  }
}

export class InvalidCredentialsError extends ServerError {
  constructor() {
    super(401, "Invalid credentials", "Failed login attempt due to invalid credentials");
  }
}

export class UserDoesNotExistError extends ServerError {
  constructor() {
    super(404, "User does not exist", "Attempt to access a non-existing user");
  }
}

export class UserAlreadyExistsError extends ServerError {
  constructor() {
    super(409, "User already exists", "Attempt to create a user that already exists");
  }
}

export class InvalidSessionError extends ServerError {
  constructor() {
    super(401, "Invalid session", "Access attempted with an invalid session");
  }
}
