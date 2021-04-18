/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: category
// ====================================================

export interface category_category_products_category {
  __typename: "Category";
  name: string;
}

export interface category_category_products_options_choices {
  __typename: "ProductChoice";
  name: string;
  extra: number | null;
}

export interface category_category_products_options {
  __typename: "ProductOption";
  name: string;
  extra: number | null;
  choices: category_category_products_options_choices[] | null;
}

export interface category_category_products_store_owner {
  __typename: "User";
  role: UserRole;
}

export interface category_category_products_store {
  __typename: "Store";
  id: number;
  owner: category_category_products_store_owner;
}

export interface category_category_products {
  __typename: "Product";
  category: category_category_products_category | null;
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  stocks: number;
  options: category_category_products_options[] | null;
  store: category_category_products_store;
}

export interface category_category_category {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  productCount: number;
}

export interface category_category {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  products: category_category_products[] | null;
  category: category_category_category | null;
}

export interface category {
  category: category_category;
}

export interface categoryVariables {
  input: CategoryInput;
}
