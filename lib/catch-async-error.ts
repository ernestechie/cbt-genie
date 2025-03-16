/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "@/modules/AppError";
import { NextRequest, NextResponse } from "next/server";

interface AsyncErrorCatch {
  (req: NextRequest): Promise<
    NextResponse<{ status: boolean; message: string }>
  >;
  (arg0: NextRequest, arg1: NextResponse<unknown>): Promise<any>;
}

export default function catchErrorAsync(handler: AsyncErrorCatch) {
  return async (req: NextRequest, res: NextResponse) => {
    return handler(req, res).catch((error: AppError) => {
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
