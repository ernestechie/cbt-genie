"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { AuthRoutes } from "@/constants/auth";
import useOnboardingCheck from "@/hooks/useOnboardingCheck";
import { studentOnboardingFormSchema } from "@/schema/student";
// import httpClient from "@/server/axios";
import FormContainer from "../Base/Form/FormContainer";
import TextInput from "../Base/Input/TextInput";
import { Button } from "../ui/button";
import { Form, FormLabel } from "../ui/form";

type StudentOnboardingFormType = z.infer<typeof studentOnboardingFormSchema>;

export default function StudentOnboardingForm() {
  const { onboardingUserExists } = useOnboardingCheck();
  const form = useForm<StudentOnboardingFormType>({
    resolver: zodResolver(studentOnboardingFormSchema),
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { control, handleSubmit, formState } = form;

  const onSubmit = async (values: StudentOnboardingFormType) => {
    // villustechie@gmail.com
    console.log("STUDENT_ONBOARDING -> ", values);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-4">
        <h2 className="text-3xl font-extrabold text-neutral-800 mb-2">
          Student Onboarding
        </h2>
        <p className="text-neutral-600">Welcome, {onboardingUserExists}</p>
        <p>Create your student profile</p>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer
            control={control}
            name="surname"
            render={(field, err) => (
              <div className="mb-4">
                <FormLabel htmlFor={field.name}>Surname *</FormLabel>
                <TextInput
                  {...field}
                  placeholder="Enter surname"
                  error={err?.message}
                />
              </div>
            )}
          />
          <FormContainer
            control={control}
            name="firstname"
            render={(field, err) => (
              <div className="mb-4">
                <FormLabel htmlFor={field.name}>First Name *</FormLabel>
                <TextInput
                  {...field}
                  placeholder="Enter first name"
                  error={err?.message}
                />
              </div>
            )}
          />

          <FormContainer
            control={control}
            name="faculty"
            render={(field, err) => (
              <div className="mb-4">
                <FormLabel htmlFor={field.name}>Faculty *</FormLabel>
                <TextInput
                  {...field}
                  placeholder="Enter faculty ID"
                  error={err?.message}
                />
              </div>
            )}
          />
          <FormContainer
            control={control}
            name="department"
            render={(field, err) => (
              <div className="mb-4">
                <FormLabel htmlFor={field.name}>Department *</FormLabel>
                <TextInput
                  {...field}
                  placeholder="Enter department ID"
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
            Create Account
          </Button>
        </form>
      </Form>
    </div>
  );
}
