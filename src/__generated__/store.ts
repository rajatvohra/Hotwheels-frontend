/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StoreInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: store
// ====================================================

export interface store_store_store_menu_options_choices {
  __typename: "ProductChoice";
  name: string;
  extra: number | null;
}

export interface store_store_store_menu_options {
  __typename: "ProductOption";
  name: string;
  extra: number | null;
  choices: store_store_store_menu_options_choices[] | null;
}

export interface store_store_store_menu_category {
  __typename: "Category";
  name: string;
}

export interface store_store_store_menu_store_owner {
  __typename: "User";
  role: UserRole;
}

export interface store_store_store_menu_store {
  __typename: "Store";
  id: number;
  owner: store_store_store_menu_store_owner;
}

export interface store_store_store_menu {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: store_store_store_menu_options[] | null;
  category: store_store_store_menu_category | null;
  store: store_store_store_menu_store;
}

export interface store_store_store {
  __typename: "Store";
  id: number;
  name: string;
  coverImg: string;
  address: string;
  menu: store_store_store_menu[];
}

export interface store_store {
  __typename: "StoreOutput";
  ok: boolean;
  error: string | null;
  store: store_store_store | null;
}

export interface store {
  store: store_store;
}

export interface storeVariables {
  input: StoreInput;
}
