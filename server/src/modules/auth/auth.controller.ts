import { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema";
import { getCurrentUser, loginUser, registerUser } from "./auth.service";
import { AppError } from "../../utils/app-error";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: false,
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export async function register(req: Request, res: Response) {
  const input = registerSchema.parse(req.body);
  const user = await registerUser(input);

  return res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const input = loginSchema.parse(req.body);
  const { token, user } = await loginUser(input);

  res.cookie("token", token, cookieOptions);

  return res.status(200).json(user);
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });

  return res.status(200).json({ message: "Logged out successfully" });
}

export async function me(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }

  const user = await getCurrentUser(req.user.id);

  return res.status(200).json(user);
}