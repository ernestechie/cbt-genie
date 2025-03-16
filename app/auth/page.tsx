"use client";

import EmailRegistrationForm from "@/components/Auth/EmailRegistrationForm";
import AuthLayout from "@/components/Layout/AuthLayout";
import React from "react";

export default function AuthPage() {
  return (
    <div>
      <AuthLayout>
        <EmailRegistrationForm />
      </AuthLayout>
    </div>
  );
}
