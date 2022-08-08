import React from 'react';
import { useSelector } from 'react-redux';
import { ProductCard } from './ProductCard';

export function ProductCardWrapper({ product, onAddToCart }) {
  const currencyLabel = useSelector(
    (state) => state.selectedCurrency.selectedCurrencyLabel
  );
  const currencySymbol = useSelector(
    (state) => state.selectedCurrency.selectedCurrencySymbol
  );

  return (
    <ProductCard
      product={product}
      currencyLabel={currencyLabel}
      currencySymbol={currencySymbol}
      onAddToCart={onAddToCart}
    />
  );
}
