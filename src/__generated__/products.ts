/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: products
// ====================================================

export interface products_products_results_options_choices {
  __typename: "ProductChoice";
  name: string;
  extra: number | null;
}

export interface products_products_results_options {
  __typename: "ProductOption";
  name: string;
  extra: number | null;
  choices: products_products_results_options_choices[] | null;
}

export interface products_products_results_category {
  __typename: "Category";
  name: string;
}

export interface products_products_results {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: products_products_results_options[] | null;
  category: products_products_results_category | null;
}

export interface products_products {
  __typename: "ProductsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: products_products_results[] | null;
}

export interface products {
  products: products_products;
}

export interface productsVariables {
  input: ProductsInput;
}
