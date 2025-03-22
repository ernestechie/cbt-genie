import { AuthStep, CBT_GENIE_USER } from "@/constants/auth";
import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";

export default function useOnboardingCheck() {
  const { setAuthStep } = useAuthStore();
  const [onboardingUserExists, setOnboardingUserExists] = useState("");

  useEffect(() => {
    const userExists = localStorage.getItem(CBT_GENIE_USER);

    if (userExists) {
      setOnboardingUserExists(userExists);
    } else {
      setAuthStep(AuthStep.EnterEmail);
    }
  }, [setAuthStep]);

  return {
    onboardingUserExists,
  };
}
