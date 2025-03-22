import catchErrorAsync from "@/lib/catch-async-error";
import { UserModel } from "@/models/UserModel";
import AppError from "@/modules/AppError";
import { studentOnboardingFormSchema } from "@/schema/student";
import getTokenData from "@/server/getTokenData";
import { connect } from "@/server/mongodb.config";
import { type NextRequest, NextResponse } from "next/server";

connect();
export const POST = catchErrorAsync(async (req: NextRequest) => {
  // const body = await req;

  console.log(req.headers);

  const userId = await getTokenData(req);
  const user = await UserModel.findById(userId).select("-__v");
  if (!user) throw new AppError("Unauthorized User", 403);

  const response = NextResponse.json(
    {
      status: true,
      message: "Onboarding successful!",
      data: { user },
    },
    { status: 201 }
  );

  return response;
}, studentOnboardingFormSchema);
