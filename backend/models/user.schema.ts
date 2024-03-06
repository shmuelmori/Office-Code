import mongoose from "mongoose";
import { IUser } from "../types/types";

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "teacher", "student"],
    required: false,
    default: "student",
  },
  techers: {
    type: [String],
    default: [],
  },
  classId: {
    type: String,
    required: false,
  },
  tast: {
    type: [{
      questionId: String,
      solution: String,
      grade: Number
    }]
  }
});

// Create the UserModel
export const UserModel = mongoose.model("user", userSchema);
