import { Request, Response } from "express";
import { QuestionModel } from "../models/question.schema";
import { isValidObjectId } from "mongoose";
import { findOneUser } from "./user.controller";
import { ClassType, CreateClassType, IUser, Question } from "../types/types";
import { ClassModal } from "../models/class.schema";
import { UserModel } from "../models/user.schema";

// @ts-ignore
import Sandbox from "sandbox";

interface SandboxOutput {
  result: any;
  consoleOutput: any;
}

export async function tast(req: Request, res: Response) {
  const { question, solution, teacher, classId, level } = req.body;

  if (!question || !solution || !teacher || !classId || !level)
    return res.status(400).json({ message: "Not all data is complete!" });

  // check if the question is alrdy exists
  const questionIsExists = await QuestionModel.findOne({
    question,
  });

  if (questionIsExists)
    return res.status(400).json({ message: "the question is alredy exists" });

  try {
    if (level === "single number") {
      const { input, outPut } = await runSolutionTypeSingle(solution);
      return res.status(200).json({input, outPut})
    } 
    else if (level == "array of numbers") {
      const { input, outPut } = await runSolutionTypeArray(solution);
      return res.status(200).json({input, outPut})
    } 
    else if (level == "matrix of numbers") {
      const { input, outPut } = await runSolutionTypeMatrix(solution);
      return res.status(200).json({input, outPut})
    }
    res.status(400).json("you need to fix the fun")
    console.log("another line")
  } catch (error) {
    console.error(error,"error");
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function runSolutionTypeSingle(solution: string) {
  const sandbox = new Sandbox();
  const outPut: any[] = [];
  const input = [
    10, -6, -3, -1, 0, 1, 3, 6, 7, 7, 10, 99, -22, 78, 12, 0, 66, 105, 12, -33,
  ];
  const inputAsString = input.map(number => number.toString());

  for (let i = 0; i < input.length; i++) {

    const code = solution + `runCode(${inputAsString[i]})`;
    const result: SandboxOutput = await new Promise((resolve, reject) => {
      sandbox.run(code, function (output: any) {
        const result = output.result;

        resolve(result);
      });
    });

    outPut.push(result);
  }

  return { input, outPut };
}

async function runSolutionTypeArray(solution: string) {
  const sandbox = new Sandbox();
  const outPut: any[] = [];
  const input = [
    [1, 5, -6, 77],
    [0, 0, 33, 105],
    [2, -1, 5, 78],
    [-10, 99, 6, 3],
  ];

  const inputAsString = ["[1, 5, -6, 77]","[0, 0, 33, 105]",
  "[2, -1, 5, 78]","[-10, 99, 6, 3]"]

  for (let i = 0; i < input.length; i++) {

    const code = solution + `runCode(${inputAsString[i]})`;
    const result: SandboxOutput = await new Promise((resolve, reject) => {
      sandbox.run(code, function (output: any) {
        const result = output.result;

        resolve(result);
      });
    });

    outPut.push(result);
  }

  return { input, outPut };
}

async function runSolutionTypeMatrix(solution: string) {
  const sandbox = new Sandbox();
  const outPut: any[] = [];
  const input = [
    [
      [1, 5, -6, 77],
      [-1, -6, -5, -100],
      [22, 3, -2, 0],
    ],
    [
      [0, 0, 33, 105],
      [4, 44, 2, 88],
      [22, -4, -9, 19],
    ],
    [
      [2, -1, 5, 78],
      [27, 86, -20, -3],
      [100, 50, 25, -5],
    ],
    [
      [-10, 99, 6, 3],
      [6, 36, -27, 55],
      [1, 1, 1, 1],
    ],
  ];
  const inputAsString = [
    "[[1, 5, -6, 77],[-1, -6, -5, -100],[22, 3, -2, 0],]",
    "[[0, 0, 33, 105],[4, 44, 2, 88],[22, -4, -9, 19],]",
    "[[2, -1, 5, 78], [27, 86, -20, -3],[100, 50, 25, -5],]",
    "[[-10, 99, 6, 3], [6, 36, -27, 55],[1, 1, 1, 1],]",
  ];


  for (let i = 0; i < input.length; i++) {

    const code = solution + `runCode(${inputAsString[i]})`;
    const result: SandboxOutput = await new Promise((resolve, reject) => {
      sandbox.run(code, function (output: any) {
        const result = output.result;

        resolve(result);
      });
    });

    outPut.push(result);
  }

  return { input, outPut };
}





























// -------------------------------------------------------------------------

export async function AddQuestion(req: Request, res: Response) {
  try {
    const { question, solution, teacher, classId, level } = req.body;

    if (!question || !solution || !teacher || !classId || !level)
      return res.status(400).json({ message: "Not all data is complete!" });

    // check if the question is alrdy exists
    const questionIsExists = await QuestionModel.findOne({
      question,
    });

    if (questionIsExists)
      return res.status(400).json({ message: "the question is alredy exists" });

    const { input, outPut } = await CheckTypeOfLevel(level, solution);

    const newQuestion = await QuestionModel.create({
      question,
      solution,
      input,
      outPut,
      teacher,
      classId,
      level,
    });

    return res.status(200).json({ message: "the function create succefuly!" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export async function CheckTypeOfLevel(level: string, solution: string) {
  if (level === "single number") {
    const { input, outPut } = await RunSolutionNumber(solution);
    return { input, outPut };
  } else if (level == "array of numbers") {
    const { input, outPut } = await RunSolutionArrayNumber(solution);
    return { input, outPut };
  } else if (level == "matrix of numbers") {
    const { input, outPut } = await RunSolutionMatrixNumber(solution);
    return { input, outPut };
  }
  return { input: null, outPut: null };
}

export async function RunSolutionNumber(solution: string) {
  const outPut: number[] = [];
  const input: number[] = [];
  const ArrayInput = [
    10, -6, -3, -1, 0, 1, 3, 6, 7, 7, 10, 99, -22, 78, 12, 0, 66, 105, 12, -33,
  ];

  try {
    // Define the complete function with a signature
    const runCodeFunction = new Function("num", `return (${solution})(num)`);

    for (let i = 0; i < ArrayInput.length; i++) {
      const currentInput = ArrayInput[i];
      const currentOutput = runCodeFunction(currentInput);

      input.push(currentInput);
      outPut.push(currentOutput);
    }
  } catch (error) {}

  return { input, outPut };
}

export async function RunSolutionArrayNumber(solution: string) {
  const outPut: number[][] = [];
  const input: number[][] = [];

  const ArrayInput = [
    [1, 5, -6, 77],
    [0, 0, 33, 105],
    [2, -1, 5, 78],
    [-10, 99, 6, 3],
  ];
  try {
    const runCodeFunction = new Function("num", `return (${solution})(num)`);

    for (let i = 0; i < ArrayInput.length; i++) {
      const currentInput: number[] = ArrayInput[i];
      const currentOutput: number[] = runCodeFunction(currentInput);

      input.push(currentInput);
      outPut.push(currentOutput);
    }
  } catch (error) {}

  return { input, outPut };
}

export async function RunSolutionMatrixNumber(solution: string) {
  const outPut: number[][][] = [];
  const input: number[][][] = [];

  const ArrayInput: number[][][] = [
    [
      [1, 5, -6, 77],
      [-1, -6, -5, -100],
      [22, 3, -2, 0],
    ],
    [
      [0, 0, 33, 105],
      [4, 44, 2, 88],
      [22, -4, -9, 19],
    ],
    [
      [2, -1, 5, 78],
      [27, 86, -20, -3],
      [100, 50, 25, -5],
    ],
    [
      [-10, 99, 6, 3],
      [6, 36, -27, 55],
      [1, 1, 1, 1],
    ],
  ];
  try {
    const runCodeFunction = new Function("num", `return (${solution})(num)`);

    for (let i = 0; i < ArrayInput.length; i++) {
      for (let j = 0; j < ArrayInput[i].length; j++) {
        const currentInput: number[][] = ArrayInput[i];
        const currentOutput: number[][] = runCodeFunction(currentInput);

        input.push(currentInput);
        outPut.push(currentOutput);
      }
    }
  } catch (error) {}

  return { input, outPut };
}

export async function getQuestionByTeacherId(req: Request, res: Response) {
  try {
    const { _id } = req.body;

    if (!isValidObjectId(_id))
      return res.status(400).json({ message: "Invalid id" });

    const classObj = await ClassModal.findById(_id);

    if (!classObj)
      return res.status(400).json({ message: "the class is not founded" });

    const allQuestions: Question[] = await QuestionModel.find({});

    const filterQuestion: Question[] = allQuestions.filter((question) => {
      return question.classId == _id;
    });

    return res.status(200).json(filterQuestion);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function DeleteQuestion(req: Request, res: Response) {
  const { question } = req.body;

  try {
    if (!question)
      return res.status(400).json({ massage: "the question not fount" });

    const deleted = await QuestionModel.deleteOne({ question });

    return res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getQuestionById(req: Request, res: Response) {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return res.status(400).json({ message: "Invalid id" });

  const question = await QuestionModel.findById(id);

  if (!question)
    return res.status(400).json({ message: "the question not found" });

  return res.status(200).json(question);
}

export async function updateSolution(req: Request, res: Response) {
  const { solution, id, questionId } = req.body;

  if (!isValidObjectId(id) || !isValidObjectId(questionId))
    return res.status(400).json({ message: "invalid id" });

  if (!solution)
    return res
      .status(400)
      .json({ message: "we not get the text solution correctly" });

  const user: IUser | null = await UserModel.findById(id);

  if (!user)
    return res.status(400).json({ message: "we not founded the user" });

  const question = await QuestionModel.findById(questionId);

  if (!question)
    return res.status(400).json({ message: "we not founded the question" });

  let testExsists: boolean = false;

  user.tast.map((oneTest) => {
    if (oneTest.questionId == questionId) {
      testExsists = true;
    }
  });

  if (testExsists)
    return res.status(400).json({ message: "the solution is exsists!" });

  user.tast.push({
    questionId: questionId,
    solution: solution,
    grade: 0,
  });

  user.save();

  return res.status(200).json({ message: "the solution sand succefuly!" });
}

export async function checkCode(req: Request, res: Response) {
  const { solution, id } = req.body;

  if (!solution)
    return res.status(400).json({ message: "we have error on solution" });

  if (!id) return res.status(400).json({ message: "we have error on id" });

  const question = await QuestionModel.findById(id);

  if (!question)
    return res.status(400).json({ message: "the question not founded" });

  const { input, outPut } = await CheckTypeOfLevel(question.level, solution);

  if (outPut == null) res.status(400).json(false);

  let answer: boolean = true;

  if (question.level === "single number") {
    answer = await checkSolutionNumber(
      outPut as number[],
      question.outPut as number[]
    );
  } else if (question.level == "array of numbers") {
    answer = await checkSolutionArrayNumber(
      outPut as number[][],
      question.outPut as number[][]
    );
  } else if (question.level == "matrix of numbers") {
    answer = await checkSolutionMatrixNumber(
      outPut as number[][][],
      question.outPut as unknown as number[][][]
    );
  }

  return res.status(200).json(answer);
}

async function checkSolutionNumber(outPut: number[], techerOutPut: number[]) {
  for (let i = 0; i < outPut.length; i++) {
    if (outPut[i] != techerOutPut[i]) {
      return false;
    }
  }

  return true;
}

async function checkSolutionArrayNumber(
  outPut: number[][],
  techerOutPut: number[][]
) {
  for (let i = 0; i < outPut.length; i++) {
    for (let j = 0; j < outPut.length; j++) {
      if (outPut[i][j] != techerOutPut[i][j]) {
        return false;
      }
    }
  }

  return true;
}
async function checkSolutionMatrixNumber(
  outPut: number[][][],
  techerOutPut: number[][][]
) {
  for (let i = 0; i < outPut.length; i++) {
    for (let j = 0; j < outPut.length; j++) {
      for (let a = 0; a < outPut.length; a++) {
        if (outPut[i][j] != techerOutPut[i][j]) {
          return false;
        }
      }
    }
  }

  return true;
}

export async function changeGrade(req: Request, res: Response) {
  const { questionId, userId, grade } = req.body;

  if (typeof grade !== "number" || grade > 100 || grade < 0)
    return res.status(400).json({ message: "the value of grade is not good" });

  if (!isValidObjectId(userId) || !isValidObjectId(questionId))
    return res.status(400).json({ message: "the id is not valid" });

  const user = await findOneUser(userId);

  if (!user) return res.status(400).json({ message: "the user not founded!" });

  const question = await QuestionModel.findById(questionId);

  if (!question)
    return res.status(400).json({ message: "the question not founded!" });

  user.tast
    .filter((index) => index.questionId === questionId)
    .map(async (index) => {
      index.grade = grade;

      await user.save();
    });

  return res.status(200).json({ message: "the changes saved succesfuly!" });
}
