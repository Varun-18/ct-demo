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
            }
          }
    }

  }
}

`;
