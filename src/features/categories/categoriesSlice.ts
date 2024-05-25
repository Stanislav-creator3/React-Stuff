import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { TState } from "./types";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${baseUrl}/categories`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    isLoading: false,
  } satisfies TState as TState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state : TState) => {
        state.isLoading = true
    })
    builder.addCase(getCategories.fulfilled, (state: TState, action) => {
        state.list = action.payload
        state.isLoading = false
    })
    builder.addCase(getCategories.rejected, (state: TState) => {
        state.isLoading = false
    })
    
  },
});

export default categoriesSlice.reducer