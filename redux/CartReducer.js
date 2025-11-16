import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        if (itemPresent.quantity > 1) {
          itemPresent.quantity -= 1;
        } else {
          const removeItem = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
          state.cart = removeItem;
        }
      }
    },
    incrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      }
    },
    decrement: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        const removeItem = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeItem;
      }
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
} = CartSlice.actions;

export default CartSlice.reducer;
