import ApiClient from "./ApiClient.ts";
import { LoginModelRequest, LoginModelResponse } from "./models/LoginModelRequest.ts";

export default class ApiRepository {
  private axiosClient = ApiClient.getInstance();

  private static instance: ApiRepository | undefined = undefined;

  private constructor() {}

  public static getInstance(): ApiRepository {
    if (!this.instance) {
      this.instance = new ApiRepository();
    }

    return this.instance!;
  }

  login(request: LoginModelRequest) {
    return this.axiosClient.post<LoginModelResponse>("/api/login", request);
  }

  getAllDocs(page: number = 0, perPage: number = 5, name?: string) {
    return this.axiosClient.get<any[]>(`/api/document/list/all`, {
      params: {
        page: page,
        per_page: perPage,
        name: name,
      },
    });
  }

  getDocDetails(docId: string) {
    return this.axiosClient.get(`/api/document/detail/${docId}`);
  }

  getCategoryList() {
    return this.axiosClient.get<any[]>("/api/category/list");
  }

  getSchoolList() {
    return this.axiosClient.get<any[]>("/api/school/list");
  }

  getLecturerList(schoolId: string) {
    return this.axiosClient.get<any[]>(`/api/school/${schoolId}/list-lecturer`);
  }

  getSubjectList(schoolId: string) {
    return this.axiosClient.get<any[]>(`/api/school/${schoolId}/list-subject`);
  }

  uploadDocument(requestBody: FormData) {
    return this.axiosClient.post("/api/document/create", requestBody);
  }
}
