export enum AuthRoutes {
  SignIn = "/auth/passwordless",
  VerifyOtp = "/auth/verify-otp",
  ResendOtp = "/auth/resend-otp",
}

export enum AuthStep {
  Welcome = "Welcome",
  EnterEmail = "EnterEmail",
  EnterOTP = "EnterOTP",
  EnterPersonalDetails = "EnterPersonalDetails",
  SignUpSuccess = "SignUpSuccess",
}

export const CBT_GENIE_COOKIE_KEY = "cbt_genie" as const;
export const CBT_GENIE_USER = "cbt_genie_user" as const;
