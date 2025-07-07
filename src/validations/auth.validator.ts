import Joi from "joi";
import { IUser } from "../common/interface";

export const signUpSchema = Joi.object<IUser>({
  userName: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});
