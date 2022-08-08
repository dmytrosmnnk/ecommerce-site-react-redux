import React from 'react';
import { GET_ITEMS } from '../../gql/GetItems';
import { useQuery } from '@apollo/client';
import { Tech } from './Tech';

export function TechQuery() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) {
    console.log('Tech catalog is loading ...');
    return <></>;
  }
  if (error) {
    return <p>Error :(</p>
  };

  const tech = data.categories.filter((item) => item.name === 'tech')[0]
    .products;

  return <Tech catalog={tech} categoryName={'tech'} />;
}
