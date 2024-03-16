export class ServerError extends Error {
  public status: number;
  public loggerMessage: string;

  constructor(status: number = 500, message: string = "Something went wrong. Please try again later.", loggerMessage?: string) {
    super(message);
    this.status = status;
    this.loggerMessage = loggerMessage ?? "A server error occurred";
  }
}
