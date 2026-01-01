import { createSlice } from "@reduxjs/toolkit";

export const BookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmarks: [],
  },
  reducers: {
    addToBookmark: (state, action) => {
      const itemPresent = state.bookmarks.find(
        (item) => item.id === action.payload.id
      );
      if (!itemPresent) {
        state.bookmarks.push({ ...action.payload });
      } // No action if item is already bookmarked
    },
    removeBookmark: (state, action) => {
      const itemPresent = state.bookmarks.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        const removeItem = state.bookmarks.filter(
          (item) => item.id !== action.payload.id
        );
        state.bookmarks = removeItem;
      }
    },
  },
});

export const { addToBookmark, removeBookmark } = BookmarkSlice.actions;

export default BookmarkSlice.reducer;
