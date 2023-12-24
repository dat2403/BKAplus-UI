import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SelectItemOptionsType } from "primereact/selectitem";

export interface UploadFileState {
  selectedFiles: File[];
  isFirstLoad: boolean;
  categoryList: SelectItemOptionsType;
  selectedCategories: string[];
  schoolList: SelectItemOptionsType;
  selectedSchool: string;
  lecturerList: SelectItemOptionsType;
  selectedLecturer: string;
  subjectList: SelectItemOptionsType;
  selectedSubject: string;
  docTitle: string;
  docDescription: string;
  selectedSemester: string;
  semesterList: SelectItemOptionsType;
  isContinueUpload: boolean;
}

const initialState: UploadFileState = {
  selectedFiles: [],
  isFirstLoad: true,
  selectedSemester: "",
  categoryList: [],
  selectedCategories: [],
  schoolList: [],
  lecturerList: [],
  subjectList: [],
  semesterList: [],
  selectedSchool: "",
  selectedLecturer: "",
  selectedSubject: "",
  docTitle: "",
  docDescription: "",
  isContinueUpload: false,
};

export const uploadFileSlice = createSlice({
  name: "uploadFile",
  initialState,
  reducers: {
    updateSelectedFiles: (state, action: PayloadAction<File[]>) => {
      state.selectedFiles = action.payload;
    },
    updateSelectedSemester: (state, action: PayloadAction<string>) => {
      state.selectedSemester = action.payload;
    },
    resetState: () => initialState,
    updateListCategory: (state, action: PayloadAction<SelectItemOptionsType>) => {
      state.categoryList = action.payload;
    },
    updateInitData: (state, action: PayloadAction<{schoolList: SelectItemOptionsType, semesterList: SelectItemOptionsType}>) => {
      state.schoolList = action.payload.schoolList;
      state.semesterList = action.payload.semesterList;
      state.isFirstLoad = false;
    },
    updateLecturerList: (state, action: PayloadAction<SelectItemOptionsType>) => {
      state.lecturerList = action.payload;
    },
    updateSubjectList: (state, action: PayloadAction<SelectItemOptionsType>) => {
      state.subjectList = action.payload;
    },
    updateSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
    },
    updateSelectedSchool: (state, action: PayloadAction<string>) => {
      state.selectedSchool = action.payload;
    },
    updateSelectedLecturer: (state, action: PayloadAction<string>) => {
      state.selectedLecturer = action.payload;
    },
    updateSelectedSubject: (state, action: PayloadAction<string>) => {
      state.selectedSubject = action.payload;
    },
    updateDocTitle: (state, action: PayloadAction<string>) => {
      state.docTitle = action.payload;
    },
    updateDocDescription: (state, action: PayloadAction<string>) => {
      state.docDescription = action.payload;
    },
    resetSelectedData: (state) => {
      state.selectedSchool = initialState.selectedSchool
      state.selectedSemester = initialState.selectedSemester
      state.selectedLecturer = initialState.selectedLecturer
      state.selectedSubject = initialState.selectedSubject
    },
    toggleContinueUpload: (state) => {
      state.isContinueUpload = !state.isContinueUpload
    }
  },
});

export const {
  updateSelectedSemester,
  updateDocTitle,
  updateDocDescription,
  updateSelectedFiles,
  updateInitData,
  resetState,
  resetSelectedData,
  updateSelectedCategories,
  updateListCategory,
  updateSelectedSchool,
  updateSelectedLecturer,
  updateSelectedSubject,
  updateLecturerList,
  updateSubjectList,
  toggleContinueUpload
} = uploadFileSlice.actions;

const uploadFileReducer = uploadFileSlice.reducer;

export default uploadFileReducer;
