import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UploadFileState {
  selectedFiles: File[];
}

const initialState: UploadFileState = {
  selectedFiles: [],
};

export const uploadFileSlice = createSlice({
  name: "uploadFile",
  initialState,
  reducers: {
    updateSelectedFiles: (state, action: PayloadAction<File[]>) => {
      state.selectedFiles = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { updateSelectedFiles, resetState } = uploadFileSlice.actions;

const uploadFileReducer = uploadFileSlice.reducer;

export default uploadFileReducer;
