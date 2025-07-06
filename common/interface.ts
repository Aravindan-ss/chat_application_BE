export interface IUser {
  userName: string;
  password: string;
}

export interface IApiResponse {
  statusCode: number;
  status: string;
  message?: string;
  // eslint-disable-next-line
  data?: any;
}