import { configureStore } from '@reduxjs/toolkit';
import selectedPageReducer from './slices/selectedPageSlice';
import cartReducer from './slices/cartSlice';
import selectedCurrencyReducer from './slices/currencySlice';

export const store = configureStore({
  reducer: {
    selectedPage: selectedPageReducer,
    cart: cartReducer,
    selectedCurrency: selectedCurrencyReducer,
  },
});
