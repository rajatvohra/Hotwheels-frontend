/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyStoreInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myStore
// ====================================================

export interface myStore_myStore_store_category {
  __typename: "Category";
  name: string;
}

export interface myStore_myStore_store_menu_options_choices {
  __typename: "ProductChoice";
  name: string;
  extra: number | null;
}

export interface myStore_myStore_store_menu_options {
  __typename: "ProductOption";
  name: string;
  extra: number | null;
  choices: myStore_myStore_store_menu_options_choices[] | null;
}

export interface myStore_myStore_store_menu {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: myStore_myStore_store_menu_options[] | null;
}

export interface myStore_myStore_store_orders {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
}

export interface myStore_myStore_store {
  __typename: "Store";
  id: number;
  name: string;
  coverImg: string;
  category: myStore_myStore_store_category | null;
  address: string;
  menu: myStore_myStore_store_menu[];
  orders: myStore_myStore_store_orders[];
}

export interface myStore_myStore {
  __typename: "MyStoreOutput";
  ok: boolean;
  error: string | null;
  store: myStore_myStore_store | null;
}

export interface myStore {
  myStore: myStore_myStore;
}

export interface myStoreVariables {
  input: MyStoreInput;
}
