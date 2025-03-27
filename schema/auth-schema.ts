import z from "zod";

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email format");

export const otpCodeSchema = z
  .string()
  .min(6, "OTP must be 6 digits")
  .max(6, "OTP must be 6 digits");

export const otpFormSchema = z.object({
  otpCode: otpCodeSchema,
});

export const emailFormSchema = z.object({
  email: emailSchema,
});

export const verificationFormSchema = z.object({
  email: emailSchema,
  otpCode: otpCodeSchema,
});

export type EmailFormType = z.infer<typeof emailFormSchema>;
