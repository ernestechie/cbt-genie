/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCode } from "@/constants/status-codes";
import AppError from "@/modules/AppError";
import { Context, TypedResponse } from "hono";

interface HonoErrorCatch {
  // (handler: Context): Promise<
  //   Response | TypedResponse<any, StatusCode, string>
  // >;
  (handler: Context): Promise<
    Response | TypedResponse<any, StatusCode, string>
  >;
}

// Hono.js version of the catch-async-error
export default function honoErrorWrapper(handler: HonoErrorCatch) {
  return async function (context: Context) {
    return handler(context).catch((error: AppError) => {
      const { json, status } = context;
      console.error(`\n -- honoErrorWrapper --`, error);

      status(error.statusCode);
      return json({
        status: error.status,
        message: error.message || error,
      });
    });
  };
}
