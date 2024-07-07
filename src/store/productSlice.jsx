import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import StatusCode from '../utils/StatusCode';

// Async thunk to fetch products
export const getProducts = createAsyncThunk('products/get', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

// Initial state
const initialState = {
  data: [],
  status: StatusCode.IDLE,
};

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = StatusCode.IDLE;
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = StatusCode.ERROR;
      });
  },
});

export default productSlice.reducer;
    