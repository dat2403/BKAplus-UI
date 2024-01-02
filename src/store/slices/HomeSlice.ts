import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HomeState {
  selectedCategory?: number;
  selectedCategoryName?: string;
}

const initialState: HomeState = {
  selectedCategory: undefined,
  selectedCategoryName: undefined,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    updateSelectedFilteredCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategory = action.payload;
    },
    updateSelectedCategoryName: (state, action: PayloadAction<string>) => {
      state.selectedCategoryName = action.payload;
    },
    resetHomeState: () => initialState,
  },
});

export const { updateSelectedFilteredCategory, updateSelectedCategoryName, resetHomeState } =
  homeSlice.actions;

const homeReducer = homeSlice.reducer;

export default homeReducer;
