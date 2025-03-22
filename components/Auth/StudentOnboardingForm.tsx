/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
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

import { AuthRoutes, AuthStep } from "@/constants/auth";
import { departments, faculties, IDepartment } from "@/constants/onboarding";
import httpClient from "@/server/axios";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import SelectInput from "../Base/Input/Select/Select";

type StudentOnboardingFormType = z.infer<typeof studentOnboardingFormSchema>;

export default function StudentOnboardingForm() {
  const { setAuthStep } = useAuthStore();
  const { onboardingUserExists } = useOnboardingCheck();

  const [departmentOptions, setDepartmentOptions] = useState<IDepartment[]>([]);
  const form = useForm<StudentOnboardingFormType>({
    resolver: zodResolver(studentOnboardingFormSchema),
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { control, handleSubmit, formState, watch, reset } = form;

  useEffect(() => {
    // Get departments with the selected faculty id
    const subscription = watch((value, { name }) => {
      if (name === "faculty" && value) {
        const facultyId = value.faculty;

        if (facultyId) {
          const allDepartments =
            departments.filter(
              (department) => department.facultyId === facultyId
            ) ?? [];

          setDepartmentOptions(allDepartments);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (values: StudentOnboardingFormType) => {
    try {
      const apiRes = await httpClient.post(AuthRoutes.Onboarding, values);
      const apiData = await apiRes.data;
      // const data = apiData?.data;

      console.log("ONBOARDING_DATA -> ", apiData);

      if (apiData.status) {
        setAuthStep(AuthStep.SignUpSuccess);
      }
      reset();
    } catch (error: any) {
      toast.error("Failed", {
        description: error?.response?.data?.message,
      });
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-4">
        <h2 className="text-3xl font-extrabold  mb-2 text-neutral-800">
          Student Onboarding
        </h2>
        <p className="font-semibold">
          Welcome, {onboardingUserExists}{" "}
          <span className="text-gray-700 font-normal">
            create your student profile
          </span>
        </p>
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
                <SelectInput
                  {...field}
                  placeholder="Select faculty"
                  options={faculties}
                  itemText="name"
                  itemValue="id"
                  error={err?.message}
                  search
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
                <SelectInput
                  {...field}
                  placeholder="Select department"
                  options={departmentOptions}
                  itemText="name"
                  itemValue="id"
                  error={err?.message}
                  search
                  emptyMessage="No options, select your faculty"
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
