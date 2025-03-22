import catchErrorAsync from "@/lib/catch-async-error";
import { connect } from "@/server/mongodb.config";
import { NextRequest, NextResponse } from "next/server";

// THIS IS GOING TO BE A PROTECTED ROUTE
connect();
export const POST = catchErrorAsync(async (req: NextRequest) => {
  const body = await req.json();

  const response = NextResponse.json(
    {
      status: true,
      message: "Onboarding successful!",
      data: body,
    },
    { status: 201 }
  );

  return response;
});
