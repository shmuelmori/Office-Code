import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


export async function requiredAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let token = req.headers.authorization;
    token = token?.split(" ")[1];

    const result = jwt.verify(token!, process.env.SECRET!) as { id: string };
    req.body.USER_ID = result.id; // Adding the user ID to the request

    next();
  } catch (error) {
    res.status(400).json({ message: "please login or signup" });
  }
}
