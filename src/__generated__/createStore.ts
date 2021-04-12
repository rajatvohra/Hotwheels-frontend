/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateStoreInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createStore
// ====================================================

export interface createStore_createStore {
  __typename: "CreateStoreOutput";
  error: string | null;
  ok: boolean;
  storeId: number;
}

export interface createStore {
  createStore: createStore_createStore;
}

export interface createStoreVariables {
  input: CreateStoreInput;
}
