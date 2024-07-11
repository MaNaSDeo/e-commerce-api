import express, { type Express, type Request, type Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";

import connectDB from "./db/connect";
import authRouter from "./routes/v1/auth.route";
import notFoundMiddleware from "./middlewares/not-found";
import errorHandlerMiddleware from "./middlewares/error-handler";

const app: Express = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(morgan("tiny")); //Console the path, type of request and time taken to execute the task.
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("E-Commerce API");
});

app.use("/api/v1/auth", authRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async (): Promise<void> => {
  try {
    connectDB(process.env.MONGO_URI!);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
