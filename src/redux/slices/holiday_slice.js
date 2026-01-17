import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/holidays";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchHolidays = createAsyncThunk(
  "holidays/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/`, getAuthHeader());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch holidays");
    }
  }
);

export const createHoliday = createAsyncThunk(
  "holidays/create",
  async (holidayData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/`, holidayData, getAuthHeader());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create holiday");
    }
  }
);

const holidaySlice = createSlice({
  name: "holidays",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearHolidayError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHolidays.pending, (state) => { state.loading = true; })
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createHoliday.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      });
  },
});

export const { clearHolidayError } = holidaySlice.actions;
export default holidaySlice.reducer;