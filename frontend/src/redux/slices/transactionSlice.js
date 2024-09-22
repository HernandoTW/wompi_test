
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createTransaction = createAsyncThunk(
  'transaction/createTransaction',
  async (transactionData) => {
    const response = await axios.post('http://localhost:3000/transactions', transactionData);
    return response.data;
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    currentTransaction: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetTransaction: (state) => {
      state.currentTransaction = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentTransaction = action.payload;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
