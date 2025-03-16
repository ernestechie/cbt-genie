"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AuthRoutes } from "@/constants/auth";
import httpClient from "@/server/axios";
import FormContainer from "../Base/Form/FormContainer";
import TextInput from "../Base/Input/TextInput";
import { Button } from "../ui/button";
import { Form, FormLabel } from "../ui/form";

const otpFormSchema = z.object({
  otpCode: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits"),
});

type OtpFormType = z.infer<typeof otpFormSchema>;

export default function EmailVerificationForm() {
  const form = useForm<OtpFormType>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { control, handleSubmit, formState } = form;

  const onSubmit = async (values: OtpFormType) => {
    const { otpCode } = values;
    const apiRes = await httpClient.post(AuthRoutes.SignIn, { otpCode });
    const apiData = await apiRes.data;

    console.log("OTP_DATA -> ", apiData);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-4">
        <h2 className="text-3xl font-extrabold text-neutral-800 mb-2">
          Verify Identity
        </h2>
        <p className="text-neutral-600">
          Enter the code sent to <b>officialisaiahovie@gmail.com</b>
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

          <Button
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
