export const calcAmount = (items) =>
  items.reduce((sum, item) => {
    return (sum + item.count);
  }, 0);
