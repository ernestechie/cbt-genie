/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "@/modules/AppError";
import { NextRequest, NextResponse } from "next/server";

interface AsyncErrorCatch {
  (req: NextRequest): Promise<NextResponse>;
  (arg0: NextRequest): Promise<any>;
}

export default function catchErrorAsync(handler: AsyncErrorCatch) {
  return async (req: NextRequest) => {
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
