"use client";

import EmailRegistrationForm from "@/components/Auth/EmailRegistrationForm";
// import EmailVerificationForm from "@/components/Auth/EmailVerificationForm";
import AuthLayout from "@/components/Layout/AuthLayout";
import React from "react";

export default function AuthPage() {
  return (
    <div>
      <AuthLayout>
        <EmailRegistrationForm />
        {/* <EmailVerificationForm /> */}
      </AuthLayout>
    </div>
  );
}
