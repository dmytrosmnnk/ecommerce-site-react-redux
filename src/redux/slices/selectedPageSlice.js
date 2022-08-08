import { createSlice } from '@reduxjs/toolkit';

const data = localStorage.getItem('selectedProduct');

const initialState = {
  selectedProduct: data && data !== 'undefined' ? JSON.parse(data) : {},
};

export const selectedPageSlice = createSlice({
  name: 'selectedPage',
  initialState,
  reducers: {
    replaceSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { replaceSelectedProduct } = selectedPageSlice.actions;

export default selectedPageSlice.reducer;
