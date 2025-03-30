export const AuthBasePath = "/auth" as const;

export const AuthRoutes = {
  SignIn: `${AuthBasePath}/passwordless`,
  Onboarding: `${AuthBasePath}/onboarding`,
  VerifyOtp: `${AuthBasePath}/verify-otp`,
  ResendOtp: `${AuthBasePath}/resend-otp`,
  Logout: `${AuthBasePath}/logout`,
} as const;

export enum AuthStep {
  Welcome = "Welcome",
  EnterEmail = "EnterEmail",
  EnterOTP = "EnterOTP",
  EnterPersonalDetails = "EnterPersonalDetails",
  SignUpSuccess = "SignUpSuccess",
}

export const CBT_GENIE_COOKIE_KEY = "cbt_genie" as const;
export const CBT_GENIE_USER = "cbt_genie_user" as const;
