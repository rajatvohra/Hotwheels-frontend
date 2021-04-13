/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myStores
// ====================================================

export interface myStores_myStores_stores {
  __typename: "Store";
  id: number;
  name: string;
  coverImg: string;
  address: string;
}

export interface myStores_myStores {
  __typename: "MyStoresOutput";
  ok: boolean;
  error: string | null;
  stores: myStores_myStores_stores[];
}

export interface myStores {
  myStores: myStores_myStores;
}
