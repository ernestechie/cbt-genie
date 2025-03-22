import { generateSecureOTP } from "@/lib/api";

import { addLuxonHours } from "@/lib/utils";
import { IUserModel, UserType } from "@/types/user";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUserModel>({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  firstname: {
    type: String,
  },
  surname: {
    type: String,
  },
  role: {
    type: String,
    enum: [UserType.ADMIN, UserType.STUDENT],
    default: UserType.STUDENT,
  },
  facultyId: String,
  departmentId: String,
  otpCode: String,
  otpCodeExpiry: Date,
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  emailResetToken: String,
  emailResetExpires: Date,
});

// Create and store otp code user.
userSchema.methods.createOtpCodeToken = async function () {
  const otpCode = generateSecureOTP();

  // TODO: Send this to email, instead of logging
  console.log("OTP CODE -> ", otpCode);

  // Hash otp with random generated salt
  const salt = await bcryptjs.genSalt(12);
  const hashedOtpCode = await bcryptjs.hash(otpCode, salt);
  const otpCodeExpiry = addLuxonHours(2);

  this.otpCode = hashedOtpCode;
  this.otpCodeExpiry = otpCodeExpiry;

  // Return the otp code that will be sent to the user email
  return otpCode;
};

// Verify user otp expiry
userSchema.methods.userOtpValid = async function (otpCode: string) {
  let otpValid = false;
  const otpIsValid = await bcryptjs.compare(otpCode, this.otpCode);
  const otpExpired = otpIsValid ? this.otpCodeExpiry < Date.now() : true;

  if (otpIsValid && !otpExpired) otpValid = true;
  return otpValid;
};

// Export this model after defining all methods and statics
export const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);
