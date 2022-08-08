import { gql } from '@apollo/client';

export const GET_ITEMS = gql`
  query GetItems {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        brand
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
    currencies {
      label
      symbol
    }
  }
`;
