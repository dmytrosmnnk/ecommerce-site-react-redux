import React from 'react';
import { GET_ITEMS } from '../../gql/GetItems';
import { useQuery } from '@apollo/client';
import { CatalogAll } from './CatalogAll';

export function CatalogAllQuery() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) {
    console.log('All products catalog is loading ...');
    return <>Loading catalog ...</>;
  };
  if (error) {
    return <p>Error :(</p>
  };

  const allProducts = data.categories.filter((item) => item.name === 'all')[0]
    .products;
  
  return (
    <CatalogAll
      catalog={allProducts}
      categoryName={'all'}
    />
  );
}
