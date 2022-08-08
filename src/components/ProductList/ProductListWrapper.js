import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList } from './ProductList';

export function ProductListWrapper({ catalog }) {
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  return <ProductList
    cart={cart}
    dispatch={dispatch}
    catalog={catalog}
  />;
}
