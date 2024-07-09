import express, { type Express, type Request, type Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./db/connect";

const app: Express = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(morgan("tiny")); //Console the path, type of request and time taken to execute the task.
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("E-Commerce API");
});

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
