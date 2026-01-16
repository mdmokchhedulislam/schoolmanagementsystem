import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/v1/routine";

// Helper function to get token and config
const getConfig = (thunkAPI) => {
  const token = thunkAPI.getState().auth.token || localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

/* =========================
    GET ALL ROUTINE
========================= */
export const getRoutine = createAsyncThunk(
  "routine/getRoutine",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/get_routine`, getConfig(thunkAPI));
      return res.data.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch routine");
    }
  }
);

/* =========================
    ADD NEW ROUTINE
========================= */
export const addRoutine = createAsyncThunk(
  "routine/addRoutine",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/add_routine`, formData, getConfig(thunkAPI));
      // Data add korar por thik moto list update korar jonno full routine abar niye asha bhalo
      thunkAPI.dispatch(getRoutine()); 
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add routine");
    }
  }
);

/* =========================
    UPDATE ROUTINE
========================= */
export const updateRoutine = createAsyncThunk(
  "routine/updateRoutine",
  async ({ id, updateData }, thunkAPI) => {
    try {
      const res = await axios.put(`${API}/update_routine/${id}`, updateData, getConfig(thunkAPI));
      thunkAPI.dispatch(getRoutine());
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update routine");
    }
  }
);

/* =========================
    DELETE ROUTINE
========================= */
export const deleteRoutine = createAsyncThunk(
  "routine/deleteRoutine",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`${API}/delete_routine/${id}`, getConfig(thunkAPI));
      thunkAPI.dispatch(getRoutine());
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete routine");
    }
  }
);

/* =========================
    SLICE
========================= */
const routineSlice = createSlice({
  name: "routine",
  initialState: {
    routineData: [],
    loading: false,
    error: null,
    success: false,
    message: ""
  },
  reducers: {
    clearRoutineState: (state) => {
      state.error = null;
      state.success = false;
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder
      // GET ROUTINE
      .addCase(getRoutine.pending, (state) => { state.loading = true; })
      .addCase(getRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.routineData = action.payload || [];
      })
      .addCase(getRoutine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD ROUTINE
      .addCase(addRoutine.pending, (state) => { state.loading = true; })
      .addCase(addRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(addRoutine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE ROUTINE
      .addCase(updateRoutine.pending, (state) => { state.loading = true; })
      .addCase(updateRoutine.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      // DELETE ROUTINE
      .addCase(deleteRoutine.pending, (state) => { state.loading = true; })
      .addCase(deleteRoutine.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      });
  }
});

export const { clearRoutineState } = routineSlice.actions;
export default routineSlice.reducer;