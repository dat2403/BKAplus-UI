import ApiClient from "./ApiClient.ts";
import {LoginModelRequest, LoginModelResponse} from "./models/LoginModelRequest.ts";

export default class ApiRepository {
  private axiosClient = ApiClient.getInstance();

  private static instance: ApiRepository | undefined = undefined
  private constructor() {
  }
  public static getInstance(): ApiRepository {
    if (!this.instance) {
      this.instance = new ApiRepository();
    }

    return this.instance!
  }

  login(request: LoginModelRequest) {
    return this.axiosClient.post<LoginModelResponse>("/api/accounts/login", request)
  }
}