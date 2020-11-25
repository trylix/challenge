import { getHttpErrorName } from 'src/shared/utils';

export class HttpException extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);

    this.name = 'HttpException';
    this.statusCode = statusCode;
  }

  getErrorResponse() {
    return {
      statusCode: this.statusCode,
      name: getHttpErrorName(this.statusCode),
      message: this.message,
    };
  }
}
