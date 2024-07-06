import express, { Express } from "express";
import * as dotenv from "dotenv";

import connectDB from "./db/connect";

const app: Express = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

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
