import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BookmarkItem {
  productId: string;
  [key: string]: any;
}

interface BookmarkState {
  bookmarks: BookmarkItem[];
}

const initialState: BookmarkState = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addToBookmark: (state, action: PayloadAction<any>) => {
      let productId = action.payload?.productId ?? action.payload?.id;
      if (productId === undefined || productId === null) return;
      productId = String(productId);
      const exists = state.bookmarks.some((i) => String(i.productId) === productId);
      if (!exists) {
        state.bookmarks.push({ ...action.payload, productId });
      }
    },

    removeBookmark: (state, action: PayloadAction<any>) => {
      let productId = action.payload;
      if (typeof action.payload === "object" && action.payload !== null) {
        productId = action.payload.productId ?? action.payload.id;
      }
      if (productId === undefined || productId === null) return;
      productId = String(productId);
      state.bookmarks = state.bookmarks.filter(
        (i) => String(i.productId) !== productId
      );
    },
  },
});

export const { addToBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
