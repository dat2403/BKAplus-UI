export interface DocumentModel {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  download_count: number;
  semester: string;
  is_verified: boolean;
  categories: Category[];
  lecturer: Lecturer;
  uploader: Uploader;
  subject: Subject;
  files: File[];
  comments: any[];
  userReactDocuments: UserReactDocument[];
  evidence_url?: string;
}

export interface Category {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface Lecturer {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  profile_url: string;
  school: School;
}

export interface School {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string;
}

export interface Uploader {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  full_name: string;
  password: string;
  avatar: string;
  role: string;
}

export interface Subject {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string;
}

export interface File {
  id: number;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export interface UserReactDocument {
  id: number;
  createdAt: string;
  updatedAt: string;
  vote: boolean;
  author: Author;
}

export interface Author {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  full_name: string;
  password: string;
  avatar: string;
  role: string;
}
