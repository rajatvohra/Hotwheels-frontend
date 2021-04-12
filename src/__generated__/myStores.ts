/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myStores
// ====================================================

export interface myStores_myStores_stores_category {
  __typename: "Category";
  name: string;
}

export interface myStores_myStores_stores {
  __typename: "Store";
  id: number;
  name: string;
  coverImg: string;
  category: myStores_myStores_stores_category | null;
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
