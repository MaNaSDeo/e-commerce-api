import { StatusCodes } from "http-status-codes";
import { type NextFunction, type Request, type Response } from "express";

interface IError extends Error {
  statusCode?: number;
  errors?: { [key: string]: { message: string } };
  code?: number;
  keyValue?: { [key: string]: string };
  value?: string;
}

const errorHandlerMiddleware = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, //500
    msg: err.message || "Something went wrong try again later",
  };

  if (err.name === "ValidationError" && err.errors) {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST; //400
  }
  if (err.code && err.code === 11000 && err.keyValue) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND; //404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
