// redux/slices/schoolSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSchoolProfile = createAsyncThunk(
  "school/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.get("http://localhost:5000/api/v1/schools/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to fetch school");
    }
  }
);

const schoolSlice = createSlice({
  name: "school",
  initialState: { school: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchoolProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchSchoolProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.school = action.payload;
      })
      .addCase(fetchSchoolProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default schoolSlice.reducer;
