import React from 'react';
import { GET_ITEMS } from '../../../gql/GetItems';
import { useQuery } from '@apollo/client';
import { NavbarCategories } from './NavbarCategories';

export function NavbarCategoriesQuery() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) {
    console.log('Navbar categories are loading ...');
    return <></>;
  }
  if (error) return <p>Error :(</p>;

  return <NavbarCategories categories={data.categories} />;
}
