import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";
import { type Request, type Response, type NextFunction } from "express";

// Extend the Request type to include a user property
interface RequestWithUser extends Request {
  user?: {
    userId: string;
    name: string;
  };
}

// Define the shape of JWT payload
interface MyJwtPayload extends JwtPayload {
  userId: string;
  name: string;
}

const auth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    // A type assertion to tell TypeScript the shape of the payload
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
