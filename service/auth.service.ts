import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user.model";
import { IApiResponse, IUser } from "../common/interface";
import { CONSTANT_MESSAGE } from "../common/constant";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const registerUser = async (userInfo: IUser) => {
  const response: IApiResponse = {
    statusCode: 401,
    status: CONSTANT_MESSAGE.STATUS.ERROR,
    message: CONSTANT_MESSAGE.SIGNIN.FAILED,
    data: null,
  };
  try {
    const { userName, password } = userInfo;
    const existing = await User.findOne({ userName });
    if (existing) {
      response.message = `${userName} userName is already exist`;
      response.statusCode = 400;
      response.status = CONSTANT_MESSAGE.SIGNIN.FAILED;
      return response;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, password: hashedPassword });
    const newUserCreated = await newUser.save();
    if(!newUserCreated) {
      response.message = CONSTANT_MESSAGE.SIGNIN.FAILED;
      response.statusCode = 500;
      response.status = CONSTANT_MESSAGE.STATUS.ERROR;
      return response;
    }
    response.data = `${userName} account has been created successfully`;
    response.message = CONSTANT_MESSAGE.SIGNIN.SUCCESS;
    response.status = "success";
    response.statusCode = 200;
    // eslint-disable-next-line
    } catch (error: any) {
    response.data = null;
    response.message = CONSTANT_MESSAGE.SIGNIN.FAILED;
    response.status = "failed";
    response.statusCode = 500;
  }
  return response;
};



export const loginUser = async (userLogin: IUser) => {
  const response: IApiResponse = {
    statusCode: 401,
    status: CONSTANT_MESSAGE.STATUS.ERROR,
    message: CONSTANT_MESSAGE.LOGIN.FAILED,
    data: null,
  };

  try {
    const { userName, password } = userLogin;

    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      response.message = `${userName} does not exist`;
      response.statusCode = 404;
      return response;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      response.message = `Invalid password`;
      response.statusCode = 401;
      return response;
    }

    const token = jwt.sign(
      { userId: existingUser._id, userName: existingUser.userName },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    response.statusCode = 200;
    response.status = "success";
    response.message = CONSTANT_MESSAGE.LOGIN.SUCCESS;
    response.data = {
      token,
      userName: existingUser.userName,
    };
    // eslint-disable-next-line
  } catch (error: any) {
    response.data = null;
    response.message = CONSTANT_MESSAGE.LOGIN.FAILED;
    response.status = "failed";
    response.statusCode = 500;
  }

  return response;
};
