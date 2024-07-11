import mongoose, { Model, Schema, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  comparePassword: (canidatePassword: string) => Promise<boolean>;
}

// const UserSchema: Schema<IUser> = new Schema({ ... });: This creates a new Schema object called UserSchema and defines the structure of the User document. The Schema type is parameterized with the IUser interface, ensuring that the schema matches the defined interface.
const UserSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: async function (value: string) {
        return validator.isEmail(value);
      },
      message: "Please provide an email",
    },
  },

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

UserSchema.pre("save", async function (this: IUser) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.comparePassword = async function (
  this: IUser,
  canidatePassword: string
) {
  const isMatch = await bcrypt.compare(canidatePassword, this.password);
  return isMatch;
};

interface IUserModel extends Model<IUser> {}

const UserModel: IUserModel = mongoose.model<IUser, IUserModel>(
  "User",
  UserSchema
);

export default UserModel;
