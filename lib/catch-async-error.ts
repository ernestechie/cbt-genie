/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCode } from "@/constants/status-codes";
import AppError from "@/modules/AppError";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface AsyncErrorCatch {
  (req: NextRequest): Promise<NextResponse>;
  (arg0: NextRequest): Promise<any>;
}

export default function catchErrorAsync<T extends z.ZodTypeAny>(
  handler: AsyncErrorCatch,
  schema?: T
  // protect?: boolean,
) {
  return async function (req: NextRequest) {
    // Validate request body: (Optionally)
    if (schema) {
      const body = await req.json();
      const result = schema.safeParse(body);

      console.error(`\n -- validateRequestBody --`, result);

      if (!result.success) {
        // const mappedErrors =
        return NextResponse.json(
          {
            status: false,
            message: "Invalid request body",
            data: { errors: result?.error?.errors },
          },
          { status: StatusCode.BAD_REQUEST }
        );
      }
    }
    // If no schema provided
    return handler(req).catch((error: AppError) => {
      console.error(`\n -- catchErrorAsync --`, error);

      return NextResponse.json(
        {
          status: error.status,
          message: error.message || error,
        },
        { status: error.statusCode }
      );
    });
  };
}
