import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user.model";
import { IUser } from "../common/interface";
import { CONSTANT_MESSAGE } from "../common/constant";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const registerUser = async (userInfo: IUser) => {
  try {
    const { userName, password } = userInfo;
    const existing = await User.findOne({ userName });
    if (existing) {
      return {
        message: `${userName} user name is already exist`,
        statusCode: 400,
        status: CONSTANT_MESSAGE.SIGNIN.FAILED,
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, password: hashedPassword });
    const newUserCreated = await newUser.save();
    if (!newUserCreated) {
      return {
        data: null,
        message: `${userName} account creation failed`,
        statusCode: 400,
        status: CONSTANT_MESSAGE.SIGNIN.FAILED,
      };
    }
    return {
      message: CONSTANT_MESSAGE.SIGNIN.SUCCESS,
      statusCode: 200,
      status: CONSTANT_MESSAGE.STATUS.SUCCESS,
      data: `${userName} account has been created successfully`,
    };
    // eslint-disable-next-line
  } catch (error: any) {
    console.error("[ERROR] Error creating user:", error.message);
    return {
      message: CONSTANT_MESSAGE.SIGNIN.FAILED,
      statusCode: 500,
      status: CONSTANT_MESSAGE.STATUS.ERROR,
      data: null,
    };
  }
};

export const loginUser = async (userLogin: IUser) => {
  try {
    const { userName, password } = userLogin;

    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return {
        message: `${userName} does not exist`,
        statusCode: 404,
        status: CONSTANT_MESSAGE.LOGIN.FAILED,
        data: null,
      };
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return {
        data: null,
        status: CONSTANT_MESSAGE.LOGIN.FAILED,
        message: CONSTANT_MESSAGE.LOGIN.INVALID_PASSWORD,
        statusCode: 401,
      };
    }

    const token = jwt.sign(
      { userId: existingUser._id, userName: existingUser.userName },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return {
      message: CONSTANT_MESSAGE.LOGIN.SUCCESS,
      statusCode: 200,
      status: CONSTANT_MESSAGE.STATUS.SUCCESS,
      data: {
        token,
        userName: existingUser.userName,
      },
    };
    // eslint-disable-next-line
  } catch (error: any) {
    console.error("[ERROR] Error logging in user:", error.message);
    return {
      message: CONSTANT_MESSAGE.LOGIN.FAILED,
      statusCode: 400,
      status: CONSTANT_MESSAGE.STATUS.ERROR,
      data: null,
    };
  }
};
