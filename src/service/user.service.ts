import User from "../model/user.model";
import { CONSTANT_MESSAGE } from "../common/constant";

export const listUsers = async () => {
  try {
    const users = await User.find({}, { userName: 1, _id: 0 });

    if (!users || users.length === 0) {
      return {
        statusCode: 404,
        status: CONSTANT_MESSAGE.STATUS.ERROR,
        message: CONSTANT_MESSAGE.USERDETAILS.NOT_FOUND,
        data: null,
      };
    }

    return {
      statusCode: 200,
      status: CONSTANT_MESSAGE.STATUS.SUCCESS,
      message: CONSTANT_MESSAGE.USERDETAILS.SUCCESS,
      data: users.map((user) => user.userName),
    };
    // eslint-disable-next-line
  } catch (error: any) {
    console.error("[ERROR] Error fetching user list:", error.message);
    return {
      statusCode: 500,
      status: CONSTANT_MESSAGE.STATUS.ERROR,
      message: CONSTANT_MESSAGE.USERDETAILS.FAILED,
      data: null,
    };
  }
};
