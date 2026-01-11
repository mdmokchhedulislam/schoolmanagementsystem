import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://localhost:5000/api/v1/teacher"; 

// Helper function to get token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// --- Async Thunks ---

export const createTeacher = createAsyncThunk(
  "teachers/createTeacher",
  async (teacherData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/`, teacherData, getAuthHeader());
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Create failed");
    }
  }
);

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/`, getAuthHeader());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);

export const fetchTeacherById = createAsyncThunk(
  "teachers/fetchTeacherById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch by ID failed");
    }
  }
);

export const updateTeacher = createAsyncThunk(
  "teachers/updateTeacher",
  async ({ id, teacherData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, teacherData, getAuthHeader());
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  "teachers/deleteTeacher",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      return id; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

// --- Slice ---

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    loading: false,
    error: null,
    singleTeacher: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSingleTeacher: (state) => {
      state.singleTeacher = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchTeachers.pending, (state) => { state.loading = true; })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Single
      .addCase(fetchTeacherById.fulfilled, (state, action) => {
        state.singleTeacher = action.payload;
      })

      // Update
      .addCase(updateTeacher.pending, (state) => { state.loading = true; })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.teachers.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.teachers[index] = action.payload;
        }
        state.singleTeacher = null;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.teachers.unshift(action.payload.data); 
      })

      // Delete
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(t => t._id !== action.payload);
      });
  },
});

export const { clearError, resetSingleTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;