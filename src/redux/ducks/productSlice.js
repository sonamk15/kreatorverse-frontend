import { createSlice } from '@reduxjs/toolkit';
import productInitialState from '../initialStates/productInitialState';

const productSlice = createSlice({
  name: 'product',
  initialState: productInitialState,
  reducers: {
    setProducts(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
