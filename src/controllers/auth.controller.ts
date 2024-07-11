import { type Request, type Response } from "express";
import User from "../models/user.model";
import { StatusCodes } from "http-status-codes";

const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  let user;
  if (email && !(await User.findOne({ email })) && name && password)
    user = await User.findOne({ email });
  res.send(user);
};

const login = async (req: Request, res: Response) => {
  res.send("Login");
};

const logout = async (req: Request, res: Response) => {
  res.send("Logout");
};

export { register, login, logout };
