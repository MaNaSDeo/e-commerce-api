import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

// const UserSchema: Schema<IUser> = new Schema({ ... });: This creates a new Schema object called UserSchema and defines the structure of the User document. The Schema type is parameterized with the IUser interface, ensuring that the schema matches the defined interface.
const UserSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },

  email: { type: String, required: [true, "Please provide email"] },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

interface IUserModel extends Model<IUser> {}

const UserModel: IUserModel = mongoose.model<IUser, IUserModel>(
  "User",
  UserSchema
);

export default UserModel;
