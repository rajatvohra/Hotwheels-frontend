/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: product
// ====================================================

export interface product_product_product_options_choices {
  __typename: "ProductChoice";
  name: string;
  extra: number | null;
}

export interface product_product_product_options {
  __typename: "ProductOption";
  name: string;
  extra: number | null;
  choices: product_product_product_options_choices[] | null;
}

export interface product_product_product_category {
  __typename: "Category";
  name: string;
}

export interface product_product_product_store_owner {
  __typename: "User";
  role: UserRole;
}

export interface product_product_product_store {
  __typename: "Store";
  id: number;
  owner: product_product_product_store_owner;
  name: string;
  coverImg: string;
  address: string;
}

export interface product_product_product {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  stocks: number;
  options: product_product_product_options[] | null;
  category: product_product_product_category | null;
  store: product_product_product_store;
  dateNextAvailable: string;
}

export interface product_product {
  __typename: "ProductOutput";
  ok: boolean;
  error: string | null;
  product: product_product_product | null;
}

export interface product {
  product: product_product;
}

export interface productVariables {
  input: ProductInput;
}
