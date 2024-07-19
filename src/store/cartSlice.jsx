import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      const existingProduct = state.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
      } else {
        state.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price });
      }
    },
    remove: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    increment: (state, action) => {
      const existingProduct = state.find(item => item.id === action.payload);
      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
      }
    },
    decrement: (state, action) => {
      const existingProduct = state.find(item => item.id === action.payload);
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
      }
    },
  },
});

export const { add, remove, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
