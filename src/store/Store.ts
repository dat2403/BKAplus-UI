import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistConfig } from "redux-persist/es/types";
import AuthReducer from "./slices/AuthSlice.ts";
import TabsReducer from "./slices/TabsSlice.ts";

const reducersToPersist: string[] = ["auth"];

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  whitelist: reducersToPersist
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  tabs: TabsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});
const persistor = persistStore(store);

export { store, persistor };

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
