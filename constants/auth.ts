export enum AuthRoutes {
  SignIn = "/auth/passwordless",
  Onboarding = "/auth/onboarding",
  VerifyOtp = "/auth/verify-otp",
  ResendOtp = "/auth/resend-otp",
  Logout = "/auth/logout",
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
