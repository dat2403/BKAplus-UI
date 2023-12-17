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
  selectedSchool: "",
  selectedLecturer: "",
  selectedSubject: "",
  docTitle: "",
  docDescription: "",
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
    updateSchoolList: (state, action: PayloadAction<SelectItemOptionsType>) => {
      state.schoolList = action.payload;
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
  },
});

export const {
  updateSelectedSemester,
  updateDocTitle,
  updateDocDescription,
  updateSelectedFiles,
  updateSchoolList,
  resetState,
  updateSelectedCategories,
  updateListCategory,
  updateSelectedSchool,
  updateSelectedLecturer,
  updateSelectedSubject,
  updateLecturerList,
  updateSubjectList,
} = uploadFileSlice.actions;

const uploadFileReducer = uploadFileSlice.reducer;

export default uploadFileReducer;
