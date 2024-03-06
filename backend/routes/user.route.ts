import express, { Router } from "express";
import { signup, login, getUserList,getOneUser, changeVerify, changeRole,getStudents,getTeachers, getAdminEmail, getOneStudent } from "../controllers/user.controller";
import { requiredAuth } from "../middlewares/auth";

const userRouter = express.Router();
userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get('/getEmailAdmin', getAdminEmail)
userRouter.get("/getOneUserById/:id", getOneStudent);
userRouter.use(requiredAuth);
userRouter.get("/getAllUsers", getUserList);
userRouter.get("/profileUser/:id", getOneUser)
userRouter.get("/change/:id", changeVerify)
userRouter.get("/changeRole/:id", changeRole)
userRouter.get("/teachers", getTeachers)
userRouter.get("/students", getStudents)

export default userRouter;
