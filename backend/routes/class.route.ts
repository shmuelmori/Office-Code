import express, { Router } from "express";
import { CreateClass, DeleteClass, getAllClass, getClassById, getNameOfTeacher } from "../controllers/class.controler";

const classRouter = express.Router();
classRouter.post("/createClass", CreateClass);
classRouter.get("/getClassById/:id", getClassById);
classRouter.get('/getAllClass', getAllClass);
classRouter.post('/DeleteClass', DeleteClass);
classRouter.get('/getNameOfTeacher/:id', getNameOfTeacher)

export default classRouter;