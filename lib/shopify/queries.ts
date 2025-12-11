export const CREATE_CART = `
    mutation createCart {
      cartCreate {
        cart {
          id
        }
      }
    }
`;

export const GET_CART = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      checkoutUrl
      id
      lines(first: 100) {
        edges {
          node {
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  id
                  altText
                  width
                  height
                  url
                }
                selectedOptions {
                  name
                  value
                }
                product {
                  title
                  handle
                  description
                  descriptionHtml
                  featuredImage {
                    id
                    altText
                    height
                    width
                    url
                  }
                  images(first: 10) {
                    edges {
                      node {
                        id
                        altText
                        height
                        width
                        url
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                    maxVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  options {
                    id
                    name
                    optionValues {
                      id
                      name
                      firstSelectableVariant {
                        availableForSale
                        quantityAvailable
                        selectedOptions {
                          name
                          value
                        }
                      }
                    }
                  }
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        title
                        price {
                          amount
                          currencyCode
                        }
                        image {
                          id
                          altText
                          height
                          width
                          url
                        }
                        selectedOptions {
                          name
                          value
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      title
      handle
      description
      descriptionHtml
      featuredImage {
        id
        altText
        height
        width
        url
      }
      images(first: 10) {
        edges {
          node {
            id
            altText
            height
            width
            url
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      options {
        id
        name
        optionValues {
          id
          name
          firstSelectableVariant {
            id
            title
            availableForSale
            quantityAvailable
            image {
              id
              altText
              height
              width
              url
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            image {
              id
              altText
              height
              width
              url
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

export const GET_COLLECTIONS = `
  query getCollections {
    collections(first: 50) {
      edges {
        node {
          id
          handle
          title
          products(first: 50) {
            edges {
              node {
                id
                title
                handle
                featuredImage {
                  id
                  altText
                  height
                  width
                  url
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ADD_CART_LINES = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_CART_LINES = `
  mutation UpdateCartLine($cartId: ID!, $cartLines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $cartLines) {
      userErrors {
        code
        field
        message
      }
    }
  }
`;

export const REMOVE_CART_LINES = `
  mutation removeItem($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      userErrors {
        code
        field
        message
      }
      warnings {
        code
        message
        target
      }
    }
  }
`;
