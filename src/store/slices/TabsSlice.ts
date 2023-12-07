import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export interface AppTabModel {
  id: string,
  label: string,
  data?: any
}

const initialState: {
  tabs: AppTabModel[],
  currentTabId: string,
} = {
  tabs: [],
  currentTabId: ""
}

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    _addTab(state, action: PayloadAction<AppTabModel>) {
      state.tabs.push(action.payload)
      state.currentTabId = action.payload.id
      return state
    },
    _removeTab(state, action: PayloadAction<string>) {
      state.tabs = state.tabs.filter(item => item.id !== action.payload)
      return state
    },
    _removeAllTab() {
      return initialState
    },
    _updateCurrentTabId(state, action: PayloadAction<string>) {
      state.currentTabId = action.payload
    }
  },
});

export const {_addTab, _removeTab, _updateCurrentTabId, _removeAllTab,} = tabsSlice.actions;

const TabsReducer = tabsSlice.reducer;

export default TabsReducer;
