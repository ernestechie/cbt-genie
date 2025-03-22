import catchErrorAsync from "@/lib/catch-async-error";
import { UserModel } from "@/models/UserModel";

import { connect } from "@/server/mongodb.config";
import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";

// Find user account with email
// If user exist, send otp to email and return a property, existingUser: true
// If not exist, create user and send verification email with link, existingUser: false
// On the frontend, if existingUser if false, redirect to "Pending Verification Screen"
// On the link sent to the user email, add a token and verify the token.
// If token verified successfully, redirect to onboarding.
connect();
export const POST = catchErrorAsync(async (req: NextRequest) => {
  let userExists = true;
  // const hasOnboarded = false;
  const body = await req.json();

  let user = await UserModel.findOne({ email: body.email }).select("-__v");
  if (!user) {
    userExists = false;
    user = await UserModel.create({ email: body.email });
  } else {
    // Generate new otp
    const otpCode = await user.createOtpCodeToken();
    // Send otp to usr email
    await user.save({ validateBeforeSave: false });

    await user.save();
  }

  // TODO: Check if user has onboarded

  const message = userExists
    ? "An otp has been sent to your email"
    : "Check your email for verification link and complete onboarding";

  return NextResponse.json(
    {
      message,
      data: {
        userExists,
        user: {
          email: user.email,
          role: user.role,
          id: user._id,
        },
      },
      status: true,
    },
    { status: 200 }
  );
});
