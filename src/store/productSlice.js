import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    add: (state) => {
      state.products.push({ id: Date.now(), name: 'Davlat' });
    },
  },
});

// Action creators are generated for each case reducer function
export const { add } = productsSlice.actions;

export default productsSlice.reducer;
