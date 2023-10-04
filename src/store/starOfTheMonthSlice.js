/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../apis/server";

const initialState = {
  starOfTheMonth: { representedData: { picture: "" } },
  loading: false,
  error: false,
};

export const fetchStar = createAsyncThunk(
  "starOfTheMonth/fetch",
  async (thunkAPI) => {
    try {
      const response = await serverApi.get(`/getStarOfTheMonth`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const starOfTheMonthSlice = createSlice({
  name: "starOfTheMonth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStar.pending, (state) => ({
      ...state,
      loading: true,
      error: false,
    }));
    builder.addCase(fetchStar.fulfilled, (state, action) => ({
      ...state,
      starOfTheMonth: action.payload,
      loading: false,
      error: false,
    }));
    builder.addCase(fetchStar.rejected, (state) => ({
      ...state,
      loading: false,
      error: true,
    }));
  },
});

export default starOfTheMonthSlice.reducer;

export const starOfTheMonthSelector = (state) => state.starOfTheMonth;
