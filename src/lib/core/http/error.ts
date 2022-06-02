import type { StatusCodes } from 'http-status-codes';

export class HttpError extends Error {
  constructor(message: string, public statusCode: StatusCodes) {
    super(message);

    this.name = this.constructor.name;
  }
}
