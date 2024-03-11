import { Request, Response } from "express";
import { ClassType, IUser } from "../types/types";
import { ClassModal } from "../models/class.schema";
import { isValidObjectId } from "mongoose";
import { findOneUser } from "./user.controller";
import { UserModel } from "../models/user.schema";

export async function CreateClass(req: Request, res: Response) {
  const { className, students, teacherId } = req.body as ClassType;
  if (!className || students.length <= 0 || !teacherId) {
    return res.status(400).json({ message: "all fields are required!" });
  }
  //go to teacher and assign the classID to
  const Teacher = await findOneUser(teacherId);

  if (!Teacher) {
    return res.status(400).json({ message: "The user not found!" });
  }

  try {
    const classFound = await ClassModal.findOne({ className });

    if (classFound)
      return res.status(400).json({ message: "the class is allredy exisist!" });

    const newClass = await ClassModal.create({
      className,
      students,
      teacherId,
    });
    /// the newClass could be null
    if (!newClass) {
      return res.status(500).json({ message: "Error creating a class" });
    }

    Teacher.classId = newClass._id as any;
    await Teacher.save();

    students.forEach(async (stud) => {
      const student = await findOneUser(stud);
      if (student) {
        student.classId = newClass._id as any;
        student.techers.push(teacherId);
        await student.save();
      }
    });
    //  send message to client saying that the class wes created successfuly
    return res.status(200).json({ message: "The calss created succefuly!" });
  } catch (err) {
    return res.status(400).json({ message: "Oops! err" });
  }
}

export async function getClassById(req: Request, res: Response) {
  const { id } = req.params;

  if (!isValidObjectId(id)) return null;

  const classObj = await ClassModal.findById(id);

  if (!classObj)
    return res.status(400).json({ message: "the id not founded!" });
  let students: IUser[] = [];
  for (const studentsID of classObj.students) {
    const student = await UserModel.findById(studentsID);
    students.push(student!);
  }
  return res.status(200).json({ class: classObj, students });
}

export async function DeleteClass(req: Request, res: Response) {
  const { _id } = req.body;

  try {
    if (!isValidObjectId(_id))
      return res.status(400).json({ message: "the id is not valid" });

    const deleteClass: ClassType | null = await ClassModal.findById(_id);

    if (!deleteClass)
      return res.status(400).json({ message: "the class is not found" });

    // change the value that put, after delete

    deleteClass.students.map(async (student) => {
      const user = await findOneUser(student);

      if (user) {
        user.techers.map(async (teacer, index) => {
          if (teacer == deleteClass.teacherId) {
            user.classId = "";
            user.techers = user.techers.filter(
              (i, ind) => ind != index || i != ""
            );
            await user.save();
          }
        });
      }

      const teacher = await findOneUser(deleteClass.teacherId);
      const temp = await ClassModal.deleteOne({ _id });
      if (teacher) {
        teacher.classId = "";
        await teacher.save();
      }
    });

    return res
      .status(200)
      .json({ message: `the ${deleteClass.className} deleted succefuly ` });
  } catch (error) {}
}

export async function getAllClass(req: Request, res: Response) {
  try {
    const allClass = await ClassModal.find({});

    if (!allClass) return res.status(400).json({ message: "class not found" });

    return res.status(200).json(allClass);
  } catch (error) {
    return res.status(400).json({ message: "we have error" });
  }
}

export async function getNameOfTeacher(req: Request, res: Response) {
  const { id } = req.params;

  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "the id is not valid" });

    const classFound = await ClassModal.findById(id);

    if (!classFound)
      return res.status(400).json({ message: "the class not found" });

    const teacher = await UserModel.findById(classFound.teacherId);

    if (!teacher)
      return res.status(400).json({ message: `the teacher not found` });

    return res.status(200).json(teacher);
  } catch (error) {
    return res.status(400).json({ message: "error server" });
  }
}
