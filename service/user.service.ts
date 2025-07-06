import User from "../model/user.model";
import { IApiResponse } from "../common/interface";
import { CONSTANT_MESSAGE } from "../common/constant";

export const listUsers = async () => {
  const response: IApiResponse = {
    statusCode: 500,
    status: CONSTANT_MESSAGE.STATUS.ERROR,
    message: CONSTANT_MESSAGE.USERDETAILS.FAILED,
    data: null,
  };

  try {
    const users = await User.find({}, { userName: 1, _id: 0 });

    response.statusCode = 200;
    response.status = "success";
    response.message = CONSTANT_MESSAGE.USERDETAILS.SUCCESS;
    response.data = users.map((user) => user.userName);
    // eslint-disable-next-line
  } catch (error: any) {
    response.data = null;
    response.message = CONSTANT_MESSAGE.USERDETAILS.FAILED
    response.status = "failed";
    response.statusCode = 500;
  }

  return response;
};
