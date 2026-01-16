import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/class_assain";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchTeacherMyClasses = createAsyncThunk(
  "classAssain/fetchTeacherMyClasses",
  async (_, { rejectWithValue }) => {
    try {
      const config = getAuthHeader();
      if (!config.headers) return rejectWithValue("Authentication token missing");
      const response = await axios.get(`${API_URL}/teacher/my-classes`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch classes");
    }
  }
);

export const createClassAssignment = createAsyncThunk(
  "classAssain/createClassAssignment",
  async (assignmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/`, assignmentData, getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Creation failed");
    }
  }
);

export const fetchAllClassAssignments = createAsyncThunk(
  "classAssain/fetchAllClassAssignments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/`, getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);

export const deleteClassAssignment = createAsyncThunk(
  "classAssain/deleteClassAssignment",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

const classAssainSlice = createSlice({
  name: "classAssain",
  initialState: {
    myClasses: [],
    allAssignments: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearClassError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherMyClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherMyClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.myClasses = Array.isArray(action.payload) ? action.payload : action.payload.data || [];
      })
      .addCase(fetchTeacherMyClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllClassAssignments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllClassAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.allAssignments = Array.isArray(action.payload) ? action.payload : action.payload.data || [];
      })
      .addCase(fetchAllClassAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createClassAssignment.fulfilled, (state, action) => {
        const newData = action.payload.data || action.payload;
        state.allAssignments.unshift(newData);
      })
      .addCase(deleteClassAssignment.fulfilled, (state, action) => {
        state.allAssignments = state.allAssignments.filter(item => item._id !== action.payload);
      });
  },
});

export const { clearClassError } = classAssainSlice.actions;
export default classAssainSlice.reducer;