import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API = "http://localhost:5000/api/v1/academicyear/";


export const fetchAcademicYears = createAsyncThunk(
  "academicYears/fetchAcademicYears",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch years"
      );
    }
  }
);


export const addAcademicYear = createAsyncThunk(
  "academicYears/addAcademicYear",
  async (yearData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.post(API, yearData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to add academic year"
      );
    }
  }
);


export const deleteAcademicYear = createAsyncThunk(
  "academicYears/deleteAcademicYear",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await axios.delete(`${API}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to delete year"
      );
    }
  }
);

const academicYearSlice = createSlice({
  name: "academicYears",
  initialState: {
    academicYears: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetYearStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Years
      .addCase(fetchAcademicYears.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAcademicYears.fulfilled, (state, action) => {
        state.loading = false;
        state.academicYears = action.payload;
      })
      .addCase(fetchAcademicYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add Year
      .addCase(addAcademicYear.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.academicYears.push(action.payload);
      })
      
      // Delete Year
      .addCase(deleteAcademicYear.fulfilled, (state, action) => {
        state.academicYears = state.academicYears.filter((y) => y._id !== action.payload);
      });
  },
});

export const { resetYearStatus } = academicYearSlice.actions;
export default academicYearSlice.reducer;