import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "teacher" | "student";
  isVerified: boolean;
  techers: string[];
  classId: string;
  tast: [
    {
      questionId: string;
      solution: string;
      grade: number;
    }
  ];
}

export interface Question {
  question: string;
  solution: string;
  input: number | number[] | number[][] | string | string[] | string[][];
  outPut: number | number[] | number[][] | string | string[] | string[][];
  teacher: string;
  classId: string;
  level: string;
  createdAt: Date; 
  updatedAt: Date;
}
export interface CreateClassType {
  className: string;
  teacherId: string;
  students: string[];
}

export interface ClassType {
  className: string;
  teacherId: string;
  students: string[];
}
