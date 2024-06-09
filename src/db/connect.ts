// Importing mongoose, a MongoDB object modeling tool
import mongoose from "mongoose";

// This function 'connectDB' takes a string as an argument (the URL of your MongoDB database) and returns a Promise that resolves with the mongoose object.
// The Promise is used because connecting to a database is an asynchronous operation.
const connectDB = (url: string): Promise<typeof mongoose> => {
  // mongoose.connect(url) returns a Promise
  return mongoose
    .connect(url)
    .then(() => {
      // If the connection is successful, it logs a message and returns the mongoose object
      console.log("Connected to the Database...");
      return mongoose;
    })
    .catch((err: Error) => {
      // If there's an error during connection, it logs the error and exits the process
      console.log(err);
      process.exit(1);
    });
};

export default connectDB;
