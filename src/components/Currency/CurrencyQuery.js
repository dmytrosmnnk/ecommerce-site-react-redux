import React from 'react';
import { GET_ITEMS } from '../../gql/GetItems';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { Currency } from './Currency';

export function CurrencyQuery() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  const selectedCurrencyLabel = useSelector(
    (state) => state.selectedCurrency.selectedCurrencyLabel
  );
  const selectedCurrencySymbol = useSelector(
    (state) => state.selectedCurrency.selectedCurrencySymbol
  );
  const dispatch = useDispatch();

  if (loading) {
    console.log('Currencies are loading ...');
    return <></>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <Currency
      currencies={data.currencies}
      selectedCurrencyLabel={selectedCurrencyLabel}
      selectedCurrencySymbol={selectedCurrencySymbol}
      dispatch={dispatch}
    />
  );
}
