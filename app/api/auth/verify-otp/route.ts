import { CBT_GENIE_COOKIE_KEY } from "@/constants/auth";
import { StatusCode } from "@/constants/status-codes";
import catchErrorAsync from "@/lib/catch-async-error";
import { UserModel } from "@/models/UserModel";
import AppError from "@/modules/AppError";
import { studentOnboardingFormSchema } from "@/schema/student";
import { connect } from "@/server/mongodb.config";
import { IUserType } from "@/types/user";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();
export const POST = catchErrorAsync(async (req: NextRequest) => {
  const body = await req.json();
  const { email, otpCode } = body;

  // Check if user already exists
  const user = await UserModel.findOne({ email }).select("-__v");
  if (!user)
    throw new AppError("User does not exist", StatusCode.RESOURCE_NOT_FOUND);
  else {
    if (user && !user.otpCode)
      throw new AppError(
        "Invalid or expired OTP",
        StatusCode.UNAUTHORIZED_USER
      );
  }

  // Check if otp is correct
  const otpIsValid = await user.userOtpValid(otpCode);
  if (!otpIsValid)
    throw new AppError("Invalid or expired OTP", StatusCode.BAD_REQUEST);

  // Check user onboarding status
  let userHasOnboarded = false;

  const onboardingData: IUserType = {
    firstname: user.firstname,
    surname: user.surname,
    faculty: user.facultyId,
    department: user.departmentId,
  };

  // Validate user schema with zod
  const { success, data: parsedSchemaData } =
    studentOnboardingFormSchema.safeParse(onboardingData);
  if (success) userHasOnboarded = true;

  // Create a token data
  const tokenData = {
    id: user._id,
    email: user.email,
    username: user.username || null,
    role: user.role,
  };

  // Create jwt token
  const jwt_secret = process.env.TOKEN_SECRET!;
  const token = await jwt.sign(tokenData, jwt_secret, {
    expiresIn: "1d",
  });

  user.otpCode = undefined;
  user.otpCodeExpiry = undefined;
  await user.save();

  const userData = userHasOnboarded
    ? { ...tokenData, ...parsedSchemaData }
    : tokenData;

  const response = NextResponse.json(
    {
      status: true,
      message: "OTP Verified successfully!",
      data: { user: userData, userHasOnboarded },
    },
    { status: 201 }
  );

  response.cookies.set(CBT_GENIE_COOKIE_KEY, token, {
    httpOnly: true,
    path: "/",
  });

  return response;
});
