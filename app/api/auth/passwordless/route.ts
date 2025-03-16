import catchErrorAsync from "@/lib/catch-async-error";
import { UserModel } from "@/models/UserModel";
import { connect } from "@/server/mongodb.config";
import { NextRequest, NextResponse } from "next/server";

// Find user account with email
// If user exist, send otp to email and return a property, existingUser: true
// If not exist, create user and send verification email with link, existingUser: false
// On the frontend, if existingUser if false, redirect to "Pending Verification Screen"
// On the link sent to the user email, add a token and verify the token.
// If token verified successfully, redirect to onboarding.
connect();
export const POST = catchErrorAsync(async (req: NextRequest) => {
  let userExists = true;
  const body = await req.json();

  let user = await UserModel.findOne({ email: body.email }).select("-__v");
  if (!user) {
    userExists = false;
    user = await UserModel.create({ email: body.email });
  }

  const message = userExists
    ? "Successful! An otp has been sent to your email"
    : "Successful! Check your email for verification link";

  return NextResponse.json(
    {
      message,
      data: {
        userExists,
        userData: user,
      },
      status: true,
    },
    { status: 200 }
  );
});
