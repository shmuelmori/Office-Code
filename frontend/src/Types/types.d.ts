export type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type LoginForm = {
  email: string;
  password: string;
};
export interface IUser {
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
  input:  number | number[] | number[][] | string | string[] | string[][];
  outPut:  number | number[] | number[][] | string | string[] | string[][];
  teacher: string;
  classId: string;
  level: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface CreateClassType {
  className: string;
  teacher: IUser | null;
  students: IUser[];
}
export interface TeacherClass {
  class: ClassType;
  students: IUser[];
}

export interface QuestionFromUser {
  question: string;
  solution: string;
  teacher: string;
  classId: string;
  level: string;
}

export interface ClassType {
  className: string;
  teacherId: string;
  students: string[];
}

export interface getClassType {
  className: string;
  teacherId: string;
  students: string[];
  _id: string
}

export interface getQuestion {
  question: string;
  solution: string;
  input:  number | number[] | number[][] | string | string[] | string[][];
  outPut:  number | number[] | number[][] | string | string[] | string[][];
  teacher: string;
  classId: string;
  level: string;
  updatedAt: Date;
  createdAt: Date;
  _id: string;
}