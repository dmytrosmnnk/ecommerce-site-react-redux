import { calcAmount } from './calcAmount';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const products = data ? JSON.parse(data) : [];
  const amount = data ? calcAmount(products) : 0;

  return {
    products,
    amount,
  };
}
