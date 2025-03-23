import { StatusCode } from "@/constants/status-codes";
import { sessionMiddleware } from "@/middlewares/session-middleware";
import { UserModel } from "@/models/UserModel";
import { emailFormSchema } from "@/schema/auth-schema";
import { studentOnboardingFormSchema } from "@/schema/student";
import honoErrorWrapper from "@/server/hono-error-wrapper";
import { connect } from "@/server/mongodb.config";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

connect();
const authRoutes = new Hono();

// Get current user details
authRoutes.get(
  "/me",
  sessionMiddleware,
  honoErrorWrapper(async (context) => {
    const user = context.get("user");
    const { status, json } = context;

    status(StatusCode.RESOURCE_RETRIEVED);
    return json({
      status: true,
      message: "User retrieved successfully",
      data: user,
    });
  })
);

// Login/Registration
authRoutes.post(
  "/passwordless",
  zValidator("json", emailFormSchema),
  async (context) => {
    const { status, json, req } = context;
    const body = req.valid("json");

    const { email } = body;

    try {
      let userExists = true;

      let user = await UserModel.findOne({ email }).select("-__v");
      if (!user) {
        userExists = false;
        user = await UserModel.create({ email: body.email });
      } else {
        // Generate new otp
        // const otpCode =
        await user.createOtpCodeToken();
        // TODO: Send otp to user email
        await user.save({ validateBeforeSave: false });
      }

      const message = userExists
        ? "An otp has been sent to your email"
        : "Check your email for verification link and complete onboarding";

      status(StatusCode.RESOURCE_RETRIEVED);
      return json({
        status: true,
        message,
        data: {
          userExists,
          user: {
            email: user.email,
            role: user.role,
            id: user._id,
          },
        },
      });
    } catch (error) {
      console.log("ONBOARDING_ERROR ->", error);

      status(StatusCode.BAD_REQUEST);
      return json({
        status: false,
        // message: error.message,
        message: "Something went wrong",
      });
    }
  }
);

// User onboarding
authRoutes.post(
  "/onboarding",
  zValidator("json", studentOnboardingFormSchema),
  sessionMiddleware,
  async (context) => {
    const { status, json, req } = context;
    const body = req.valid("json");

    try {
      const userId = context.get("user");
      const user = await UserModel.findByIdAndUpdate(userId, body, {
        runValidators: true,
        new: true,
      }).select("-__v -otpCodeExpiry -otpCode");

      status(StatusCode.RESOURCE_RETRIEVED);
      return json({
        status: true,
        message: "Onboarding successful!",
        user,
      });
    } catch (error) {
      console.log("ONBOARDING_ERROR ->", error);

      status(StatusCode.BAD_REQUEST);
      return json({
        status: false,
        message: "Something went wrong",
      });
    }
  }
);

export default authRoutes;
