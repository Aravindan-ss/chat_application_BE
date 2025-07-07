import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { CONSTANT_MESSAGE } from "../common/constant";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const userAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rawHeader = req.headers.authorization;
  const authHeader = Array.isArray(rawHeader) ? rawHeader[0] : rawHeader;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: CONSTANT_MESSAGE.STATUS.ERROR,
      message: CONSTANT_MESSAGE.USERDETAILS.AUTHENTICATION_TOKEN_INVALID,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // eslint-disable-next-line
    (req as any).user = decoded;

    next();
    // eslint-disable-next-line
  } catch (err: any) {
    return res.status(403).json({
      status: CONSTANT_MESSAGE.STATUS.ERROR,
      message: CONSTANT_MESSAGE.USERDETAILS.AUTHENTICATION_FAILED,
    });
  }
};

export default userAuthentication;
