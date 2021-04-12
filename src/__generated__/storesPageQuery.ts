/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StoresInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: storesPageQuery
// ====================================================

export interface storesPageQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  storeCount: number;
}

export interface storesPageQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: storesPageQuery_allCategories_categories[] | null;
}

export interface storesPageQuery_stores_results_category {
  __typename: "Category";
  name: string;
}

export interface storesPageQuery_stores_results {
  __typename: "Store";
  id: number;
  name: string;
  coverImg: string;
  category: storesPageQuery_stores_results_category | null;
  address: string;
}

export interface storesPageQuery_stores {
  __typename: "StoresOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: storesPageQuery_stores_results[] | null;
}

export interface storesPageQuery {
  allCategories: storesPageQuery_allCategories;
  stores: storesPageQuery_stores;
}

export interface storesPageQueryVariables {
  input: StoresInput;
}
