import React from 'react';
import { GET_ITEMS } from '../../gql/GetItems';
import { useQuery } from '@apollo/client';
import { Clothes } from './Clothes';

export function ClothesQuery() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) {
    console.log('Clothes are loading ...');
    return <></>;
  }
  if (error) {
    return <p>Error :(</p>
  };

  const clothes = data.categories.filter((item) => item.name === 'clothes')[0]
    .products;

  return (
    <Clothes catalog={clothes} categoryName={'clothes'} />
  );
}
