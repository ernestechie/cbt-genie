"use client";

import { emailSchema } from "@/schema/auth-schema";

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

const emailFormSchema = z.object({
  email: emailSchema,
});

type EmailFormType = z.infer<typeof emailFormSchema>;

export default function EmailRegistrationForm() {
  const form = useForm<EmailFormType>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { control, handleSubmit, formState } = form;

  const onSubmit = async (values: EmailFormType) => {
    const { email } = values;
    const apiRes = await httpClient.post(AuthRoutes.SignIn, { email });
    const apiData = await apiRes.data;

    console.log("API_DATA -> ", apiData);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-4">
        <h2 className="text-3xl font-extrabold text-neutral-800 mb-2">
          Register/Login
        </h2>
        <p className="text-neutral-600">Enter your email address to proceed</p>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer
            control={control}
            name="email"
            render={(field, err) => (
              <div className="mb-4">
                <FormLabel htmlFor={field.name}>Email Address</FormLabel>
                <TextInput
                  {...field}
                  type="email"
                  placeholder="Enter email..."
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

      {/*  */}
      <p className="text-sm text-neutral-600 text-center">
        By clicking continue, you agree to our <b>Terms of Service</b> and{" "}
        <b>Privacy Policy.</b>
      </p>
    </div>
  );
}
