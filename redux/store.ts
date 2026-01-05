import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./CartReducer";
import bookmarkReducer from "./BookmarkReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  cart: cartReducer,
  bookmark: bookmarkReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["cart", "bookmark"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
