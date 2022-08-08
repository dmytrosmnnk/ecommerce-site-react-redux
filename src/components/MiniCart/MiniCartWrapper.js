import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MiniCart } from './MiniCart';

export function MiniCartWrapper({ toggle }) {
  const cart = useSelector((state) => state.cart.products);
  const amount = useSelector((state) => state.cart.amount);
  const currencyLabel = useSelector(
    (state) => state.selectedCurrency.selectedCurrencyLabel
  );
  const currencySymbol = useSelector(
    (state) => state.selectedCurrency.selectedCurrencySymbol
  );
  const dispatch = useDispatch();

  return (
    <MiniCart
      cart={cart}
      amount={amount}
      currencyLabel={currencyLabel}
      currencySymbol={currencySymbol}
      toggle={toggle}
      dispatch={dispatch}
    />
  );
}
