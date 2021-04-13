/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchProductInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchProduct
// ====================================================

export interface searchProduct_searchProduct_products_category {
  __typename: "Category";
  name: string;
}

export interface searchProduct_searchProduct_products_options_choices {
  __typename: "ProductChoice";
  name: string;
  extra: number | null;
}

export interface searchProduct_searchProduct_products_options {
  __typename: "ProductOption";
  name: string;
  extra: number | null;
  choices: searchProduct_searchProduct_products_options_choices[] | null;
}

export interface searchProduct_searchProduct_products {
  __typename: "Product";
  category: searchProduct_searchProduct_products_category | null;
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: searchProduct_searchProduct_products_options[] | null;
}

export interface searchProduct_searchProduct {
  __typename: "SearchProductOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  products: searchProduct_searchProduct_products[] | null;
}

export interface searchProduct {
  searchProduct: searchProduct_searchProduct;
}

export interface searchProductVariables {
  input: SearchProductInput;
}
