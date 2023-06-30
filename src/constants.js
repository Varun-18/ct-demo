import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query get($page: Int) {
    products(page: $page) {
      id
      name {
        en
      }
      slug {
        en
      }
      masterVariant {
        id
        images {
          url
        }
        prices {
          value {
            centAmount
            currencyCode
            fractionDigits
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query getProductById($productId: ID) {
    product(id: $productId) {
      id
      name {
        en
      }

      masterVariant {
        id
        images {
          url
        }
        prices {
          value {
            centAmount
            currencyCode
            fractionDigits
          }
        }
        attributes {
          name
          value
        }
      }
    }
  }
`;

export const priceCalculator = (price, fraction) => {
  const result = price / Math.pow(10, fraction);
  return result;
};
