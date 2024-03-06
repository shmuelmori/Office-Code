// All add by shmuel
import mongoose, { Schema } from "mongoose";
import { Question } from "../types/types";

const questionSchema = new mongoose.Schema<Question>({
  question: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    default: "",
    required: false,
  },
  input: {
    type: Schema.Types.Mixed,
    required: true,
    },
  outPut: {
    type: Schema.Types.Mixed,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  classId:{
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: false,
  }
}, {timestamps: true});

export const QuestionModel = mongoose.model("question", questionSchema);
