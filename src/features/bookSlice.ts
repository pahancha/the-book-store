import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchBooksAPI } from "../api/booksApi";

interface BooksState {
  books: any[];
  status: string;
  cart: any[];
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  status: "idle",
  cart: [],
  error: null,
};

// async action to fetch books based on a search term
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (searchTerm: string) => {
    const response = await fetchBooksAPI(searchTerm);
    return response.data.items;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((book) => book.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })

      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong.";
      });
  },
});

export const { addToCart, removeFromCart } = booksSlice.actions;
export default booksSlice.reducer;
