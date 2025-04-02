"use client";

import EmailRegistrationForm from "@/components/Auth/EmailRegistrationForm";
import EmailVerificationForm from "@/components/Auth/EmailVerificationForm";
import StudentOnboardingForm from "@/components/Auth/StudentOnboardingForm";
import SuccessPage from "@/components/Auth/SuccessPage";
import AuthLayout from "@/components/Layout/AuthLayout";
import Logo from "@/components/Logo";
import { AuthStep } from "@/constants/auth";
import { useAuthStore } from "@/store/auth-store";
import React from "react";

export default function AuthPage() {
  const { authStep } = useAuthStore();

  const renderAuthStep = () => {
    switch (authStep) {
      case AuthStep.EnterOTP:
        return <EmailVerificationForm />;
      case AuthStep.EnterPersonalDetails:
        return <StudentOnboardingForm />;
      case AuthStep.SignUpSuccess:
        return <SuccessPage />;
      default:
        return <EmailRegistrationForm />;
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8">
        <Logo />
      </div>
      {renderAuthStep()}
    </AuthLayout>
  );
}
