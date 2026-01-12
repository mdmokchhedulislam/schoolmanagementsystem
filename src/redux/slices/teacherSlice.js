import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/teacher"; 

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// --- Async Thunks ---

export const fetchTeacherProfile = createAsyncThunk(
  "teachers/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/profile`, getAuthHeader());
      return response.data.teacher || response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Profile fetch failed");
    }
  }
);

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
    profile: null, 
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
      // Fetch Profile
      .addCase(fetchTeacherProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchTeacherProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchTeacherProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Teachers
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
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teachers.findIndex((t) => t._id === action.payload?._id);
        if (index !== -1) {
          state.teachers[index] = action.payload;
        }
        state.singleTeacher = null;
      })
      
      // Create
      .addCase(createTeacher.fulfilled, (state, action) => {
        const newData = action.payload.data || action.payload;
        state.teachers.unshift(newData); 
      })

      // Delete
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(t => t._id !== action.payload);
      });
  },
});

export const { clearError, resetSingleTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;