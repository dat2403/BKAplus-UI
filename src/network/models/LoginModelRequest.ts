import UserModel from "./UserModel.ts";

export interface LoginModelRequest {
  email: string;
  password: string;
}

export type LoginModelResponse = UserModel;
