import { z } from "zod";

export const studentOnboardingFormSchema = z.object({
  surname: z.string().min(1, "Surname is required"),
  firstname: z.string().min(1, "First Name is required"),
  faculty: z.string().min(1, "Faculty is required"),
  department: z.string().min(1, "Department is required"),
});

export type IUserType = z.infer<typeof studentOnboardingFormSchema>;
