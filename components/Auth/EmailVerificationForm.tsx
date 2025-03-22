/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AuthRoutes, AuthStep } from "@/constants/auth";
import useOnboardingCheck from "@/hooks/useOnboardingCheck";
import { otpFormSchema } from "@/schema/auth-schema";
import httpClient from "@/server/axios";
import { useAuthStore } from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FormContainer from "../Base/Form/FormContainer";
import TextInput from "../Base/Input/TextInput";
import { Button } from "../ui/button";
import { Form, FormLabel } from "../ui/form";

type OtpFormType = z.infer<typeof otpFormSchema>;

export default function EmailVerificationForm() {
  const router = useRouter();

  const { onboardingUserExists } = useOnboardingCheck();
  const { setAuthStep } = useAuthStore();
  const [resendingOtp, setResendingOtp] = useState(false);

  const form = useForm<OtpFormType>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { control, handleSubmit, formState, reset } = form;

  const onSubmit = async (values: OtpFormType) => {
    try {
      const { otpCode } = values;
      const apiRes = await httpClient.post(AuthRoutes.VerifyOtp, {
        otpCode,
        email: onboardingUserExists,
      });
      const apiData = await apiRes.data;
      const data = apiData?.data;

      const toastMessage = data?.userHasOnboarded
        ? `Welcome, ${data?.user?.firstname} ${data?.user?.surname}`
        : "Complete onboarding process and create your student profile";

      if (data?.user?.id) {
        toast.success("Verification Successful", {
          description: toastMessage,
          duration: data?.userHasOnboarded ? 5000 : 3000,
        });

        // Check if user has onboarded
        if (data?.userHasOnboarded) {
          setAuthStep(AuthStep.EnterEmail);
          router.push("/app");
        } else setAuthStep(AuthStep.EnterPersonalDetails);
      }
      reset();
    } catch (error: any) {
      toast.error("Failed", {
        description: error?.response?.data?.message,
      });
    }
  };

  // Handle otp resend
  const handleResendOtp = async () => {
    try {
      setResendingOtp(true);
      const apiRes = await httpClient.post(AuthRoutes.ResendOtp, {
        email: onboardingUserExists,
      });

      const apiData = await apiRes.data;

      if (apiData?.user?.id) {
        toast.success("Successful", {
          description: apiData?.message,
        });
      }
    } catch (error: any) {
      toast.error("Failed", {
        description: error?.response?.data?.message,
      });
    } finally {
      setResendingOtp(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-4">
        <h2 className="text-3xl font-extrabold text-neutral-800 mb-2">
          Verify Identity
        </h2>
        <p className="text-neutral-600">
          Enter the code sent to <b>{onboardingUserExists}</b>
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer
            control={control}
            name="otpCode"
            render={(field, err) => (
              <div className="mb-4">
                <FormLabel htmlFor={field.name}>OTP Code</FormLabel>
                <TextInput
                  {...field}
                  type="number"
                  maxLength={6}
                  placeholder="e.g 469-101"
                  error={err?.message}
                />
              </div>
            )}
          />

          <div className="flex items-center mb-4 !text-sm text-neutral-600">
            <p>
              {/* Countdown / Resend */}
              Didn&apos;t you receive the OTP?
            </p>

            <Button
              variant="link"
              size="small"
              type="button"
              onClick={handleResendOtp}
              loading={resendingOtp}
            >
              Resend OTP
            </Button>
          </div>

          <Button
            variant="default"
            size="large"
            block
            type="submit"
            loading={formState.isSubmitting}
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
