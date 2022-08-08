import { createSlice } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../helpers/getCartFromLS';

const { products, amount } = getCartFromLS();

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products,
    amount,
  },
  reducers: {
    addProduct: (state, action) => {
      const sameItem = state.products.find(
        (product) =>
          product.id === action.payload.id &&
          JSON.stringify(product.attributes) ===
            JSON.stringify(action.payload.attributes)
      );

      if (sameItem) {
        sameItem.count++;
      } else {
        state.products.push(action.payload);
      }
      

      state.amount = state.products.reduce((sum, item) => {
        return (sum + item.count);
      }, 0);
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.cartId !== action.payload
      );

      state.amount = state.products.reduce((sum, item) => {
        return sum + item.count;
      }, 0);
    },

    clearCart: (state) => {
      state.products = [];
      state.amount = 0;
    },

    plusCount: (state, action) => {
      const selectedItem = state.products.find(
        (item) => item.cartId === action.payload
      );
      selectedItem.count++;

      state.amount = state.products.reduce((sum, item) => {
        return sum + item.count;
      }, 0);
    },

    minusCount: (state, action) => {
      const selectedItem = state.products.find(
        (item) => item.cartId === action.payload
      );
      selectedItem.count > 1 && selectedItem.count--;

      state.amount = state.products.reduce((sum, item) => {
        return sum + item.count;
      }, 0);
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  clearCart,
  plusCount,
  minusCount,
} = cartSlice.actions;

export default cartSlice.reducer;
