import catchErrorAsync from "@/lib/catch-async-error";
import { connect } from "@/server/mongodb.config";
import { type NextRequest, NextResponse } from "next/server";

// THIS IS GOING TO BE A PROTECTED ROUTE
connect();
export const POST = catchErrorAsync(async (req: NextRequest) => {
  const body = await req.json();
  console.log(body);

  const response = NextResponse.json(
    {
      status: true,
      message: "Onboarding successful!",
      data: null,
    },
    { status: 201 }
  );

  return response;
});
