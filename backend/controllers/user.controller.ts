import { Request, Response } from "express";
import { UserModel } from "../models/user.schema";
import { isValidObjectId } from "mongoose";
import { checkPassword, generateToken, hashPassword } from "../utils/helpers";
import { IUser } from "../types/types";
export async function signup(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password } = req.body;
    //checking is all values are given
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ message: "all fields are required" });
    //check if the user exists already
    const user = await UserModel.findOne({
      email,
    });
    if (user)
      return res
        .status(400)
        .json({ message: "the user already exist in the system" });
    //send the password to be hashed in order to secure the data in the db
    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
      email,
      firstName,
      isVerified: false,
      lastName,
      password: hashedPassword,
      role: "student",
      techers: [],
      tast: [],
      classId: "",
    });
    return res.status(201).json({ message: "User created successfuly" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "all fields are required" });
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "user dose not exist 😔" });
    //check if the passwords are the same
    const isMatch = await checkPassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "incorrect password" });
    const token = generateToken(user._id as any);
    return res.status(200).json({ token, user });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
export async function getUserList(req: Request, res: Response) {
  // getting the user id
  const { USER_ID } = req.body;
  //verifying that that the user id and admin
  const user = await UserModel.findById(USER_ID);

  if (!user) return res.status(400).json({ message: "user not found" });

  if (user.role != "admin")
    return res.status(403).json({ message: "admin only" });
  // returning all of the users beside the admin itself
  const allUsers = await UserModel.find({});
  //filter the admin out of the array
  const users = allUsers.filter((user) => user.role != "admin");
  return res.status(200).json(users);
}

export async function getOneUser(req: Request, res: Response) {
  //get the user id from the params
  const { id } = req.params;
  const { USER_ID } = req.body;
  //validate the the id is good
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "the id is not valid" });
  //make sure that the USER_ID belongs to the admin
  const user = await findOneUser(USER_ID);
  if (!user) return res.status(400).json({ message: "user not found" });
  if (user.role != "admin")
    return res.status(429).json({
      message: "Only admin have access to this data",
    });

  const SearchUser = await findOneUser(id);
  if (!SearchUser) return res.status(400).json({ message: "user not found" });

  return res.status(200).json(SearchUser);
}

export async function getOneStudent(req: Request, res: Response) {
  const {id} = req.params;
  
  if (!isValidObjectId(id)) return res.status(400).json({ message: "the id is not valid" });
  
  const user = await UserModel.findById(id);
  
  if (!user) return res.status(400).json({ message: "the user not found" });
  
  return res.status(200).json(user);
}


export async function findOneUser(id: string) {
  if (!isValidObjectId(id)) return null;
  const user = await UserModel.findById(id);
  if (!user) return null;
  return user;
}
export async function changeVerify(req: Request, res: Response) {
  const { id } = req.params;
  const user = await findOneUser(id);
  if (!user) return res.status(400).json({ message: "User was not found" });
  //true == false , false == true
  user.isVerified = !user.isVerified;
  await user.save();
  return res.status(200).json({ message: "User updated successfuly" });
}
export async function changeRole(req: Request, res: Response) {
  const { id } = req.params;
  const user = await findOneUser(id);
  if (!user) return res.status(400).json({ message: "User was not found" });
  if (user.classId.length > 0)
    return res
      .status(400)
      .json({ message: `the ${user.role} have a class you can't change..` });
  if (user.role == "student") {
    user.role = "teacher";
  } else if (user.role == "teacher") {
    user.role = "student";
  }
  await user.save();
  return res.status(200).json({ message: "User Role updated successfuly" });
}
export async function getTeachers(req: Request, res: Response) {
  const { USER_ID } = req.body;
  const user = await findOneUser(USER_ID);
  if (!user) return res.status(400).json({ message: "User dose not exists" });
  if (user.role != "admin")
    return res.status(400).json({ message: "get the f**k out of here 🖕" });
  const users = await UserModel.find({ role: "teacher" });
  return res.status(200).json(users);
}
export async function getStudents(req: Request, res: Response) {
  const { USER_ID } = req.body;
  const user = await findOneUser(USER_ID);
  if (!user) return res.status(400).json({ message: "User dose not exists" });
  if (user.role != "admin")
    return res.status(400).json({ message: "get the f**k out of here 🖕" });
  const users = await UserModel.find({ role: "student" });
  return res.status(200).json(users);
}

export async function getAdminEmail(req: Request, res: Response) {
  try {
    const user: IUser | null = await UserModel.findOne({ role: "admin" });

    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(user.email);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


