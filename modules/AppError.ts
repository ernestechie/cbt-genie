import { StatusCode } from "@/constants/status-codes";

/**
 * Custom error handler extended from `Error`
 */
class AppError extends Error {
  status: boolean;
  isOperational: boolean;

  constructor(message: string, public statusCode: StatusCode) {
    super(message);
    this.status = false;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
