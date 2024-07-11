import { type Request, type Response } from "express";
import User from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";

const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists)
    throw new CustomError.BadRequestError("Email already exists");

  // First registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ email, name, password, role });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req: Request, res: Response) => {
  res.send("Login");
};

const logout = async (req: Request, res: Response) => {
  res.send("Logout");
};

export { register, login, logout };
