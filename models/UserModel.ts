import { IUserModel, UserType } from "@/types/user";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUserModel>({
  email: {
    type: String,
    required: [true, "Email is required"],
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
  matriculationNumber: {
    type: String,
    unique: true,
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

export const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);
