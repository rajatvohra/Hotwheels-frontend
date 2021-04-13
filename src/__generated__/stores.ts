/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StoresInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: stores
// ====================================================

export interface stores_stores_results {
  __typename: "Store";
  id: number;
  name: string;
  coverImg: string;
  address: string;
}

export interface stores_stores {
  __typename: "StoresOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: stores_stores_results[] | null;
}

export interface stores {
  stores: stores_stores;
}

export interface storesVariables {
  input: StoresInput;
}
