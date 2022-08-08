import { createSlice } from '@reduxjs/toolkit';

const data1 = localStorage.getItem('selectedCurrencyLabel');
const data2 = localStorage.getItem('selectedCurrencySymbol');

const initialState = {
  selectedCurrencyLabel: data1 && data1 !== 'undefined' ? data1 : 'USD',
  selectedCurrencySymbol: data2 && data2 !== 'undefined' ? data2 : '$',
};

export const currencySlice = createSlice({
  name: 'selectedCurrency',
  initialState,
  reducers: {
    switchCurrencyLabel: (state, action) => {
      state.selectedCurrencyLabel = action.payload;
    },
    switchCurrencySymbol: (state, action) => {
      state.selectedCurrencySymbol = action.payload;
    },
  },
});

export const { switchCurrencyLabel, switchCurrencySymbol } = currencySlice.actions;

export default currencySlice.reducer;
