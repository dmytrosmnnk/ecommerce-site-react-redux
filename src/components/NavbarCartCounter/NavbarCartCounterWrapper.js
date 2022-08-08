import React from 'react';
import { useSelector } from 'react-redux';
import { NavbarCartCounter } from './NavbarCartCounter';

export function NavbarCartCounterWrapper({toggle}) {
  const amount = useSelector((state) => state.cart.amount);

  return <NavbarCartCounter amount={amount} toggle={toggle} />;
}
