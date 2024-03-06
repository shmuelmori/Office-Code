import mongoose from "mongoose";
import { CreateClassType } from "../types/types";

const classSchema = new mongoose.Schema<CreateClassType>({
   className: {
     type: String,
     required: true,
   },
   students: {
     type: [String],
     required: true,
   },
   teacherId: {
     type: String,
     required: true,
   },
 });

// Create the UserModel
export const ClassModal = mongoose.model("class", classSchema);
