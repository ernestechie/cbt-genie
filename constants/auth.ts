export enum AuthRoutes {
  SignIn = "/auth/passwordless",
}

export enum AuthSteps {
  Welcome = "Welcome",
  EnterEmail = "EnterEmail",
  EnterOTP = "EnterOTP",
  EnterPersonalDetails = "EnterPersonalDetails",
  SignUpSuccess = "SignUpSuccess",
}

export const CBT_GENIE_COOKIE_KEY = "CBT_GENIE" as const;
export const CBT_GENIE_USER = "CBT_GENIE_USER" as const;
