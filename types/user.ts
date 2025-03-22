import { Document } from "mongoose";

export enum UserType {
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
}

export interface IUserModel extends Document {
  email: string;
  role: UserType;
  firstname: string;
  surname: string;
  facultyId: string;
  departmentId: string;
  username: string;
  emailResetToken: string;
  emailResetExpires: Date;
  emailVerificationToken: string;
  emailVerificationExpires: Date;
  otpCode: string;
  otpCodeExpiry: Date;
  emailLastChanged: Date;
  // Declare the method in the interface
  updateEmailAfter: (JWTTimestamp: number) => boolean;
  userOtpValid: (otpCode: string) => boolean;
  createOtpCodeToken: () => string;
  createEmailResetToken: () => string;
  createEmailVerificationToken: () => string;
}
