import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query get($searched: String, $page: Int) {
    products(searched: $searched, page: $page) {
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

export const GET_SUGGESTIONS = gql`
  query getSuggestion($keyword: String) {
    suggestions(keyword: $keyword) {
      text
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($data: JSON) {
    addUser(data: $data)
  }
`;

export const ADD_SOCIALS_USER = gql`
  mutation addSocialsUser($data: JSON) {
    addUser(data: $data)
  }
`;

export const CHECK_EXISTING = gql`
  mutation checkUser($data: JSON) {
    checkUser(data: $data)
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($data: JSON) {
    loginUser(data: $data)
  }
`;

export const priceCalculator = (price, fraction) => {
  const result = price / Math.pow(10, fraction);
  return result;
};
