import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:5000/api/v1/result"; 

export const saveBulkMarks = createAsyncThunk(
  "marks/saveBulk",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(`${API_URL}/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(data.message || "Marks saved successfully!");
      return data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getMarksBySubject = createAsyncThunk(
  "marks/fetchBySubject",
  async ({ examId, subjectId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${API_URL}/get-by-subject`, {
        params: { examId, subjectId },
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch marks");
    }
  }
);

export const getStudentOwnResult = createAsyncThunk(
  "marks/fetchStudentResult",
  async (examId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${API_URL}/my-result/${examId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch result");
    }
  }
);

const markSlice = createSlice({
  name: "marks",
  initialState: {
    marksList: [],
    studentResult: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearMarkError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveBulkMarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveBulkMarks.fulfilled, (state, action) => {
        state.loading = false;
        state.marksList = action.payload;
      })
      .addCase(saveBulkMarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMarksBySubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMarksBySubject.fulfilled, (state, action) => {
        state.loading = false;
        state.marksList = action.payload;
      })
      .addCase(getMarksBySubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getStudentOwnResult.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentOwnResult.fulfilled, (state, action) => {
        state.loading = false;
        state.studentResult = action.payload;
      })
      .addCase(getStudentOwnResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMarkError } = markSlice.actions;
export default markSlice.reducer;