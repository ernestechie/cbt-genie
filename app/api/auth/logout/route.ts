import { CBT_GENIE_COOKIE_KEY } from "@/constants/auth";
import catchErrorAsync from "@/lib/catch-async-error";
import { NextResponse } from "next/server";

export const GET = catchErrorAsync(async () => {
  const response = NextResponse.json({
    status: true,
    message: "Logout Successful",
  });

  response.cookies.set(CBT_GENIE_COOKIE_KEY, "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return response;
});
