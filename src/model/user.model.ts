import { Schema, model } from "mongoose";
import { IUser } from "../common/interface";

const UserSchema: Schema<IUser> = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", UserSchema);
export default User;
