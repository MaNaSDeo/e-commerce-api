import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

interface BadRequestError {
  statusCode: number;
}
class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST; //400
  }
}

export default BadRequestError;
