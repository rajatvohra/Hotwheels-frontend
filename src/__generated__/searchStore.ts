/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchStoreInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchStore
// ====================================================

export interface searchStore_searchStore_stores_category {
  __typename: "Category";
  name: string;
}

export interface searchStore_searchStore_stores {
  __typename: "Store";
  id: number;
  name: string;
  coverImg: string;
  category: searchStore_searchStore_stores_category | null;
  address: string;
}

export interface searchStore_searchStore {
  __typename: "SearchStoreOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  stores: searchStore_searchStore_stores[] | null;
}

export interface searchStore {
  searchStore: searchStore_searchStore;
}

export interface searchStoreVariables {
  input: SearchStoreInput;
}
