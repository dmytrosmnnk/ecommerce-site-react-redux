export const getAmount = (query, array) =>
  array.find((item) => item.currency.label === query).amount;
