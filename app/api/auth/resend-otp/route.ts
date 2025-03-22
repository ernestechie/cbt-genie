import catchErrorAsync from "@/lib/catch-async-error";
import { UserModel } from "@/models/UserModel";
import AppError from "@/modules/AppError";
import { connect } from "@/server/mongodb.config";

import { NextRequest, NextResponse } from "next/server";

connect();
export const POST = catchErrorAsync(async (req: NextRequest) => {
  const body = await req.json();
  const { email } = body;

  // Check if user already exists
  const user = await UserModel.findOne({ email }).select(
    "-__v -otpCode -otpCodeExpiry"
  );
  if (!user) throw new AppError("User does not exist", 400);

  // Generate new otp
  const otpCode = await user.createOtpCodeToken();
  await user.save({ validateBeforeSave: false });

  // TODO: Send otp email to user

  const response = NextResponse.json(
    {
      status: true,
      message: "A new OTP has been sent to your email!",
      user: { id: user._id },
    },
    { status: 201 }
  );

  return response;
});
