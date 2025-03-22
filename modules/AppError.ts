/**
 * Custom error handler extended from `Error`
 */
class AppError extends Error {
  status: boolean;
  isOperational: boolean;

  constructor(message: string, public statusCode: number) {
    super(message);
    this.status = false;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
