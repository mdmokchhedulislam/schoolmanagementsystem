import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/transition";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchAllTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (filters, { rejectWithValue }) => {
    try {
      console.log("Fetching all transactions with filters:", filters);
      const { type, category, startDate, endDate } = filters || {};
      let url = `${API_URL}/all?`;
      if (type) url += `type=${type}&`;
      if (category) url += `category=${category}&`;
      if (startDate && endDate) url += `startDate=${startDate}&endDate=${endDate}`;

      const response = await axios.get(url, getAuthHeader());
      console.log("Fetch success:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Fetch error:", error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch transactions");
    }
  }
);

export const getTransactionSummary = createAsyncThunk(
  "transactions/getSummary",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching summary data...");
      const response = await axios.get(`${API_URL}/summary`, getAuthHeader());
      console.log("Summary success:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Summary error:", error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch summary");
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (transactionData, { rejectWithValue, dispatch }) => {
    try {
      console.log("Creating new transaction:", transactionData);
      const response = await axios.post(`${API_URL}/create`, transactionData, getAuthHeader());
      console.log("Create success:", response.data.data);
      dispatch(getTransactionSummary());
      return response.data.data;
    } catch (error) {
      console.error("Create error:", error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message || "Failed to create transaction");
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      console.log(`Updating transaction ID: ${id}`, data);
      const response = await axios.put(`${API_URL}/update/${id}`, data, getAuthHeader());
      console.log("Update success:", response.data.data);
      dispatch(getTransactionSummary());
      return response.data.data;
    } catch (error) {
      console.error("Update error:", error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      console.log(`Deleting transaction ID: ${id}`);
      await axios.delete(`${API_URL}/delete/${id}`, getAuthHeader());
      console.log("Delete success for ID:", id);
      dispatch(getTransactionSummary());
      return id;
    } catch (error) {
      console.error("Delete error:", error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    summary: {
      today: { income: 0, expense: 0, balance: 0 },
      monthly: { income: 0, expense: 0, savings: 0 },
      totalBalance: 0
    },
    loading: false,
    error: null
  },
  reducers: {
    clearTransactionError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTransactionSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(t => t._id === action.payload._id);
        if (index !== -1) state.transactions[index] = action.payload;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(t => t._id !== action.payload);
      });
  }
});

export const { clearTransactionError } = transactionSlice.actions;
export default transactionSlice.reducer;