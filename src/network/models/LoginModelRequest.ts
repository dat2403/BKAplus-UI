import UserModel from "./UserModel.ts";

export interface LoginModelRequest {
  user_name: string,
  password: string,
}


export type LoginModelResponse = UserModel
