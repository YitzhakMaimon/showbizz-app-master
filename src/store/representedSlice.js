/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../apis/server";

const initialState = {
  represented: [],
  loading: false,
  error: false,
};

export const fetchRepresented = createAsyncThunk(
  "represented/fetch",
  async (thunkAPI) => {
    try {
      const response = await serverApi.get(`/getAllRepresented`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const representedSlice = createSlice({
  name: "represented",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRepresented.pending, (state) => ({
      ...state,
      loading: true,
      error: false,
    }));
    builder.addCase(fetchRepresented.fulfilled, (state, action) => ({
      ...state,
      represented: action.payload,
      loading: false,
      error: false,
    }));
    builder.addCase(fetchRepresented.rejected, (state) => ({
      ...state,
      loading: false,
      error: true,
    }));
  },
});

export default representedSlice.reducer;

export const representedSelector = (state) => state.represented;
