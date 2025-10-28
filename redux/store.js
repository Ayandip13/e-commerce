import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartReducer";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
