import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/v1/exam";

const getConfig = (thunkAPI) => {
  const token = thunkAPI.getState().auth.token || localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};


export const getStudentDashboardExams = createAsyncThunk(
  "exams/getStudentDashboardExams",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/student-exams`, getConfig(thunkAPI));
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch student exams");
    }
  }
);


export const getTeacherExams = createAsyncThunk(
  "exams/getTeacherExams",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/teacher-exams`, getConfig(thunkAPI));
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch teacher exams");
    }
  }
);


export const getAllExams = createAsyncThunk(
  "exams/getAllExams",
  async (filters, thunkAPI) => {
    try {
      const res = await axios.get(API, {
        ...getConfig(thunkAPI),
        params: filters,
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch all exams");
    }
  }
);


export const createExam = createAsyncThunk(
  "exams/createExam",
  async (examData, thunkAPI) => {
    try {
      const res = await axios.post(API, examData, getConfig(thunkAPI));
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create exam");
    }
  }
);


export const deleteExam = createAsyncThunk(
  "exams/deleteExam",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API}/${id}`, getConfig(thunkAPI));
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete exam");
    }
  }
);

const examSlice = createSlice({
  name: "exams",
  initialState: {
    exams: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetExamStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentDashboardExams.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })
      .addCase(getTeacherExams.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })
      .addCase(getAllExams.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.exams.unshift(action.payload);
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = state.exams.filter((exam) => exam._id !== action.payload);
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { resetExamStatus } = examSlice.actions;
export default examSlice.reducer;