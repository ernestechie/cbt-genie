import { z } from "zod";

export const sendEmailSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  from: z.string().optional(),
  recipients: z.array(
    z
      .string()
      .min(1, "Recipient email is required")
      .email("Invalid email format")
  ),
});
