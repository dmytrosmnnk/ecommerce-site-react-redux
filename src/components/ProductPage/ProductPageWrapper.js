import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductPage } from './ProductPage';

export function ProductPageWrapper() {
  const selectedProduct = useSelector(state => state.selectedPage.selectedProduct);
  const cart = useSelector(state => state.cart.products);
  const currencyLabel = useSelector(
    (state) => state.selectedCurrency.selectedCurrencyLabel
  );
  const currencySymbol = useSelector(
    (state) => state.selectedCurrency.selectedCurrencySymbol
  );
  const dispatch = useDispatch();

  return (
    <ProductPage
      product={selectedProduct}
      cart={cart}
      currencyLabel={currencyLabel}
      currencySymbol={currencySymbol}
      dispatch={dispatch}
    />
  );
}
