import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface OtpEmailProps {
  otpCode?: string;
}

export default function OtpEmail({ otpCode }: OtpEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Email Verification</Preview>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`https://res.cloudinary.com/df4xvp4df/image/upload/v1743637201/logo-primary-filled_jkxnde.png`}
                width="60"
                height="60"
                alt="CBT Genie's Logo"
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>
                Use the following one-time password (OTP) to sign in to your CBT
                Genie account.
              </Text>
              <Section style={verificationSection}>
                <Text style={codeText}>{otpCode}</Text>
                <Text style={validityText}>
                  (This code is valid for 30 minutes)
                </Text>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                Once confirmed, this email will be uniquely associated with your
                account.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            This message was produced and distributed by CBT Genie. All rights
            reserved.{" "}
            <Link href="https://cbtgenie.online" target="_blank" style={link}>
              cbtgenie.online
            </Link>
            . View our{" "}
            <Link
              href="https://cbtgenie.online/privacy-policy"
              target="_blank"
              style={link}
            >
              privacy policy
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  margin: "0 auto",
  backgroundColor: "#eee",
  borderRadius: "12px",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "16px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px 12px 0 0",
};

const coverSection = { backgroundColor: "#fff" };
const upperSection = { padding: "18px 32px" };
const lowerSection = { padding: "18px 32px" };
const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};
const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0 14px 0",
};
const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};
const verificationSection = {
  display: "flex",
  alignItems: "center",
  FlexDirection: "column",
  gap: "8px",
};
const mainText = { ...text, marginBottom: "10px" };
const cautionText = { ...text, margin: "0px" };
