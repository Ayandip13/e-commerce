import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  quantity: number;
  [key: string]: any;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeCart: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter((i) => i.id !== action.payload.id);
      }
    },

    incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cart.find((i) => i.id === action.payload.id);
      if (item) item.quantity += 1;
    },

    decrement: (state, action: PayloadAction<{ id: string }>) => {
      state.cart = state.cart.filter((i) => i.id !== action.payload.id);
    },

    cleanCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeCart,
  incrementQuantity,
  decrement,
  cleanCart,
} = cartSlice.actions;

export default cartSlice.reducer;
