import ApiClient from "./ApiClient.ts";
import { LoginModelRequest, LoginModelResponse } from "./models/LoginModelRequest.ts";
import { DocumentModel } from "./models/DocumentModel.ts";

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

  getAllDocs(params: any) {
    return this.axiosClient.get<any[]>(`/api/document/list/all`, {
      params: params
    });
  }

  getRecentDocs() {
    return this.axiosClient.get<any[]>("/api/document/list/recent-view");
  }

  getDocDetails(docId: string) {
    return this.axiosClient.get<DocumentModel>(`/api/document/detail/${docId}`);
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
    return this.axiosClient.post<any>("/api/document/create", requestBody, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  reactDoc(docId: string, vote?: boolean) {
    return this.axiosClient.post<DocumentModel>("/api/document/vote", {
      id: docId,
      vote: vote
    })
  }

  addComment(docId: string, content: string) {
    return this.axiosClient.post<DocumentModel>("/api/document/comment", {
      id: docId,
      content: content
    })
  }
}
