import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/routine/period";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
};

// 1. Fetch All Periods
export const fetchPeriods = createAsyncThunk(
    "periods/fetchPeriods",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/`, getAuthHeader());
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Periods fetch failed");
        }
    }
);

// 2. Create New Period
export const createPeriod = createAsyncThunk(
    "periods/createPeriod",
    async (periodData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/`, periodData, getAuthHeader());
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Create failed");
        }
    }
);

// 3. Update Period
export const updatePeriod = createAsyncThunk(
    "periods/updatePeriod",
    async ({ id, periodData }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}`, periodData, getAuthHeader());
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Update failed");
        }
    }
);

// 4. Delete Period
export const deletePeriod = createAsyncThunk(
    "periods/deletePeriod",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`, getAuthHeader());
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

const periodSlice = createSlice({
    name: "periods",
    initialState: {
        periods: [],
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        clearPeriodState: (state) => {
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchPeriods.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPeriods.fulfilled, (state, action) => {
                state.loading = false;
                state.periods = action.payload;
            })
            .addCase(fetchPeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create
            .addCase(createPeriod.fulfilled, (state, action) => {
                state.periods.push(action.payload);
                state.success = true;
            })
            // Update
            .addCase(updatePeriod.fulfilled, (state, action) => {
                const index = state.periods.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.periods[index] = action.payload;
                }
            })
            // Delete
            .addCase(deletePeriod.fulfilled, (state, action) => {
                state.periods = state.periods.filter(p => p._id !== action.payload);
            });
    }
});

export const { clearPeriodState } = periodSlice.actions;
export default periodSlice.reducer;