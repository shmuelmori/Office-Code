import express, { Router } from "express";
import {
  AddQuestion,
  DeleteQuestion,
  changeGrade,
  checkCode,
  getQuestionById,
  getQuestionByTeacherId,
  updateSolution,
} from "../controllers/question.controllers";
// @ts-ignore
const questionRouter = express.Router();
questionRouter.post("/AddQuestion", AddQuestion);
questionRouter.post("/getQuestionByTeacherId", getQuestionByTeacherId);
questionRouter.post("/DeleteQuestion", DeleteQuestion);
questionRouter.get("/getQuestionById/:id", getQuestionById);
questionRouter.post("/updateSolution", updateSolution);
questionRouter.post("/checkCode", checkCode);
questionRouter.post("/changeGrade", changeGrade);



questionRouter.post('/tast', AddQuestion)
export default questionRouter;


// export async function tast(req: Request, res: Response) {

//   const sandbox = new Sandbox();

//   try {
//     const code = "function run(){return 8} run()";
//     if (!code) {
//       return res.status(400).json({ message: "Code must be provided" });
//     }

//     const output: SandboxOutput = await new Promise((resolve, reject) => {
//       sandbox.run(code, function (output: any) {
//         const result = output.result;
//         const consoleOutput = output.console;

//         resolve({ result, consoleOutput });
//       });
//     });

//     console.log(output.result + "!!!!!"); 

//     return res.status(200).json(output);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// }