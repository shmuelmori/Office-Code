import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(String(password), salt);
  return hash;
}
export async function checkPassword(
  oriinalPassword: string,
  dbPassword: string
): Promise<boolean> {
  const isGood = await bcrypt.compare(oriinalPassword, dbPassword);
  return isGood;
}
export function generateToken(id: string): string {
  const token = jwt.sign({ id }, process.env.SECRET!, { expiresIn: "3d" });
  return token;
}
