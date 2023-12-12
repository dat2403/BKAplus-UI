import UserModel from "./UserModel.ts";

export interface LoginModelRequest {
  phone_number: string;
  password: string;
}

export type LoginModelResponse = UserModel;
