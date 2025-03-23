/* eslint-disable @typescript-eslint/no-explicit-any */
import { CBT_GENIE_COOKIE_KEY } from "@/constants/auth";
import { StatusCode } from "@/constants/status-codes";
import { UserModel } from "@/models/UserModel";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import jwt from "jsonwebtoken";

type AuthContext = {
  Variables: {
    user: typeof UserModel | null;
    userId: string;
  };
};

export const sessionMiddleware = createMiddleware<AuthContext>(
  async (context, next) => {
    const { json, status } = context;

    try {
      const token = getCookie(context, CBT_GENIE_COOKIE_KEY);

      if (!token) {
        status(StatusCode.UNAUTHORIZED_USER);
        return json({
          message: "Unauthorized User",
          status: false,
        });
      }

      const decodedTokenValue = jwt.verify(
        token,
        process.env.TOKEN_SECRET!
      ) as any;

      const userId = await decodedTokenValue?.id;

      const user = await UserModel.findById(userId).select(
        "-__v -otpCode -otpCodeExpiry"
      );

      if (!user) {
        status(StatusCode.UNAUTHORIZED_USER);
        return json({
          message: "Unauthorized User",
          status: false,
        });
      }

      context.set("user", user);
      context.set("userId", userId);
      await next();
    } catch (err) {
      console.log("sessionMiddleware => ", err);

      status(StatusCode.INERNAL_SERVER_ERROR);
      return json({
        message: "Something went wrong",
        status: false,
      });
    }
  }
);
