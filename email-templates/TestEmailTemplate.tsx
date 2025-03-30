import React from "react";

export interface TestEmailTemplateProps {
  otpCode: string;
}

export const TestEmailTemplate = ({ otpCode }: TestEmailTemplateProps) => (
  <div>
    <h1>Welcome, use this OTP to sign in!</h1>
    <p className="text-3xl my-4 font-bold">{otpCode}</p>
  </div>
);
