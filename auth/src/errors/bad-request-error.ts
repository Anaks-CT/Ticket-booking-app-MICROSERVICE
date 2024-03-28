import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 500;
  constructor(message: string) {
    // only for logging purpose
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
