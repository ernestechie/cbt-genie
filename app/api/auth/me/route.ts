import { StatusCode } from "@/constants/status-codes";
import catchErrorAsync from "@/lib/catch-async-error";
import { UserModel } from "@/models/UserModel";
import AppError from "@/modules/AppError";
import getTokenData from "@/server/getTokenData";
import { connect } from "@/server/mongodb.config";
import { NextRequest, NextResponse } from "next/server";

connect();
export const GET = catchErrorAsync(async (request: NextRequest) => {
  const userId = await getTokenData(request);
  const user = await UserModel.findById(userId).select(
    "-__v -otpCode -otpCodeExpiry"
  );

  if (!user)
    throw new AppError("Unauthorized User", StatusCode.UNAUTHORIZED_USER);

  return NextResponse.json(
    {
      message: "User retrieved succesfully!",
      user,
    },
    { status: 200 }
  );
});
