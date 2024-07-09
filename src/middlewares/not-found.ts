import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFound = (req: Request, res: Response) =>
  res.status(StatusCodes.NOT_FOUND).send("Route does not exists");

export default notFound;
