import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartReducer";
import bookmarkReducer from "./BookmarkReducer";

export default configureStore({
  reducer: {
    cart: cartReducer,
    bookmark: bookmarkReducer,
  },
});
