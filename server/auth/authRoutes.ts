import { CBT_GENIE_COOKIE_KEY } from "@/constants/auth";
import { StatusCode } from "@/constants/status-codes";
import { sessionMiddleware } from "@/middlewares/session-middleware";
import { UserModel } from "@/models/UserModel";
import { emailFormSchema, verificationFormSchema } from "@/schema/auth-schema";
import { studentOnboardingFormSchema } from "@/schema/student";
import honoErrorWrapper from "@/server/hono-error-wrapper";
import { connect } from "@/server/mongodb.config";
import { IUserType } from "@/types/user";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import jwt from "jsonwebtoken";

connect();
const authRoutes = new Hono();

// Get current user details
authRoutes.get(
  "/me",
  sessionMiddleware,
  honoErrorWrapper(async (context) => {
    const user = context.get("user");

    context.status(StatusCode.RESOURCE_RETRIEVED);
    return context.json({
      status: true,
      message: "User retrieved successfully",
      data: user,
    });
  })
);

// Logout User
authRoutes.get(
  "/logout",
  honoErrorWrapper(async (context) => {
    deleteCookie(context, CBT_GENIE_COOKIE_KEY, {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });

    context.status(StatusCode.RESOURCE_RETRIEVED);
    return context.json({
      status: true,
      message: "Logout successful",
      data: null,
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

// Verify OTP
authRoutes.post(
  "/verify-otp",
  zValidator("json", verificationFormSchema),
  async (context) => {
    const { status, json, req } = context;
    const body = req.valid("json");

    const { otpCode, email } = body;

    try {
      const user = await UserModel.findOne({ email }).select("-__v");
      if (!user) {
        status(StatusCode.UNAUTHORIZED_USER);
        return json({
          message: "User does not exist",
          status: false,
        });
      } else {
        if (user && !user.otpCode) {
          status(StatusCode.UNAUTHORIZED_USER);
          return json({
            message: "Invalid or expired OTP",
            status: false,
          });
        }
      }

      // Check if otp is correct
      const otpIsValid = await user.userOtpValid(otpCode);
      if (!otpIsValid) {
        status(StatusCode.BAD_REQUEST);
        return json({
          message: "Invalid or expired OTP",
          status: false,
        });
      }

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

      setCookie(context, CBT_GENIE_COOKIE_KEY, token, {
        httpOnly: true,
        path: "/",
      });

      status(StatusCode.RESOURCE_RETRIEVED);
      return json({
        status: true,
        message: "OTP Verified successfully!",
        data: { user: userData, userHasOnboarded },
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

// Resend OTP
authRoutes.post(
  "/resend-otp",
  zValidator("json", emailFormSchema),
  async (context) => {
    const { status, json, req } = context;
    const body = req.valid("json");

    const { email } = body;

    try {
      const user = await UserModel.findOne({ email }).select(
        "-__v -otpCode -otpCodeExpiry"
      );

      if (!user) {
        status(StatusCode.UNAUTHORIZED_USER);
        return json({
          message: "User does not exist",
          status: false,
        });
      }

      // Generate new otp
      // const otpCode =
      await user.createOtpCodeToken();
      await user.save({ validateBeforeSave: false });

      // TODO: Send otp email to user

      status(StatusCode.RESOURCE_CREATED);
      return json({
        status: true,
        message: "A new OTP has been sent to your email!",
        user: { id: user._id },
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

    let userHasOnboarded = false;
    try {
      const userId = context.get("userId");

      const user = await UserModel.findById(userId).select(
        "-__v -otpCodeExpiry -otpCode"
      );

      // Get the onboarding-type data from the current user(User must be signed in to access onboarding endpoint)
      const onboardingData: IUserType = {
        firstname: user.firstname,
        surname: user.surname,
        faculty: user.facultyId,
        department: user.departmentId,
      };

      // Validate user schema with zod, checking if user already onboarded.
      // If true, the details already exist. We do not want to accept this change, unless coming from admin.
      const { success, data } =
        studentOnboardingFormSchema.safeParse(onboardingData);
      if (success) userHasOnboarded = true;
      else {
        user.firstname = body.firstname;
        user.surname = body.surname;
        user.facultyId = body.faculty;
        user.departmentId = body.department;

        await user.save();
      }

      console.log("Parsed schema data -> ", data);

      if (userHasOnboarded) {
        status(StatusCode.BAD_REQUEST);
        return json({
          status: false,
          message: "User have already completed the onboarding process",
        });
      }

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
