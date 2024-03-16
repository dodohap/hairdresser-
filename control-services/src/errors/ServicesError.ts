import { ServerError } from "./ServerError";

export class ServiceNotFoundError extends ServerError {
  constructor() {
    super(404, "Service not found");
  }
}
