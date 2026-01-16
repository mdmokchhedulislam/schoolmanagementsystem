import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/routine/day";

// Auth Header helper
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
};

// 1. Fetch Working Days
export const fetchDays = createAsyncThunk(
    "days/fetchDays",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/`, getAuthHeader());
            return response.data.data; // Backend theke "data" array ashbe
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Days fetch failed");
        }
    }
);

// 2. Create Working Day
export const createDay = createAsyncThunk(
    "days/createDay",
    async (dayName, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/`, { name: dayName }, getAuthHeader());
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Create failed");
        }
    }
);

// 3. Update Day Status (Working/Non-working)
export const updateDayStatus = createAsyncThunk(
    "days/updateDayStatus",
    async ({ id, statusData }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}`, statusData, getAuthHeader());
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Update failed");
        }
    }
);

// 4. Delete Day
export const deleteDay = createAsyncThunk(
    "days/deleteDay",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`, getAuthHeader());
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Delete failed");
        }
    }
);

const daySlice = createSlice({
    name: "days",
    initialState: {
        days: [],
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        clearDayState: (state) => {
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Days
            .addCase(fetchDays.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDays.fulfilled, (state, action) => {
                state.loading = false;
                state.days = action.payload;
            })
            .addCase(fetchDays.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Day
            .addCase(createDay.fulfilled, (state, action) => {
                state.days.push(action.payload);
                state.success = true;
            })
            // Update Day
            .addCase(updateDayStatus.fulfilled, (state, action) => {
                const index = state.days.findIndex(d => d._id === action.payload._id);
                if (index !== -1) {
                    state.days[index] = action.payload;
                }
            })
            // Delete Day
            .addCase(deleteDay.fulfilled, (state, action) => {
                state.days = state.days.filter(d => d._id !== action.payload);
            });
    }
});

export const { clearDayState } = daySlice.actions;
export default daySlice.reducer;