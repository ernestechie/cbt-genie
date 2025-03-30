import { sendEmailSchema } from "@/schema/email";
import { ComponentType, ReactElement } from "react";
import { Resend } from "resend";
import { z } from "zod";

interface SendEmailProps<T extends object>
  extends z.infer<typeof sendEmailSchema> {
  template: ComponentType<T>;
  templateProps: T;
}

export const sendEmail = async <T extends object>({
  from,
  recipients,
  subject,
  template: TemplateComponent,
  templateProps,
}: SendEmailProps<T>) => {
  const resend = new Resend(process.env.RESEND_MAIL_KEY);

  // ? Correctly renders the template component with props using
  const emailTemplateComponent: ReactElement = (
    <TemplateComponent {...templateProps} />
  );

  try {
    const { data, error } = await resend.emails.send({
      from: from || `CBT Genie <${process.env.ZOHO_HELLO_EMAIL}>`,
      to: recipients,
      subject,
      react: emailTemplateComponent,
    });

    if (error) {
      console.error("Error sending email -> ", error);
      return { status: false, error };
    }

    return { status: true, data };
  } catch (err) {
    console.error("Unexpected error -> ", err);
    return { status: false, error: err };
  }
};
