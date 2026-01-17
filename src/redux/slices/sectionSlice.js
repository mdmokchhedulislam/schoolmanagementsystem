import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/v1/section/";

export const fetchSections = createAsyncThunk(
  "sections/fetchSections",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token"); 
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load sections"
      );
    }
  }
);

export const createSection = createAsyncThunk(
  "sections/createSection",
  async (sectionData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(API, sectionData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create section"
      );
    }
  }
);

export const updateSection = createAsyncThunk(
  "sections/updateSection",
  async ({ id, sectionData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${API}${id}`, sectionData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
  }
);

export const deleteSection = createAsyncThunk(
  "sections/deleteSection",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Delete failed"
      );
    }
  }
);

const sectionSlice = createSlice({
  name: "sections",
  initialState: {
    sections: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSectionStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
        state.error = null;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSection.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.sections.push(action.payload);
        state.error = null;
      })
      .addCase(createSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        const index = state.sections.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
        state.success = true;
        state.error = null;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.sections = state.sections.filter((s) => s._id !== action.payload);
        state.error = null;
      });
  },
});

export const { resetSectionStatus } = sectionSlice.actions;
export default sectionSlice.reducer;