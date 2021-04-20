/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterProductInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: filterProduct
// ====================================================

export interface filterProduct_filterProduct_products_options_choices {
  __typename: "ProductChoice";
  name: string;
  extra: number | null;
}

export interface filterProduct_filterProduct_products_options {
  __typename: "ProductOption";
  name: string;
  extra: number | null;
  choices: filterProduct_filterProduct_products_options_choices[] | null;
}

export interface filterProduct_filterProduct_products_category {
  __typename: "Category";
  name: string;
}

export interface filterProduct_filterProduct_products_store_owner {
  __typename: "User";
  role: UserRole;
}

export interface filterProduct_filterProduct_products_store {
  __typename: "Store";
  id: number;
  owner: filterProduct_filterProduct_products_store_owner;
}

export interface filterProduct_filterProduct_products {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  stocks: number;
  options: filterProduct_filterProduct_products_options[] | null;
  category: filterProduct_filterProduct_products_category | null;
  store: filterProduct_filterProduct_products_store;
}

export interface filterProduct_filterProduct {
  __typename: "FilterProductOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  products: filterProduct_filterProduct_products[] | null;
}

export interface filterProduct {
  filterProduct: filterProduct_filterProduct;
}

export interface filterProductVariables {
  input: FilterProductInput;
}
