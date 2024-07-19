import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import StatusCode from '../utils/StatusCode';

  // Get  produts here 
  
export const getProducts = createAsyncThunk('products/get', async (category = null) => {
  const url = category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products';
  const response = await axios.get(url);
  return response.data;
}); 

// Get Categories here
export const getCategories = createAsyncThunk('products/getCategories', async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
});



const initialState = {
  data: [],
  categories: [],
  status: StatusCode.IDLE,
  filter: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearFilter: (state) => {
      state.filter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = StatusCode.IDLE;
      })
      .addCase(getCategories.rejected, (state) => {
        state.status = StatusCode.ERROR;
      })
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

export const { setFilter, clearFilter } = productSlice.actions;
export default productSlice.reducer;
