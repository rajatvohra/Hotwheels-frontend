/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus, UserRole, OrderMode } from "./globalTypes";

// ====================================================
// GraphQL fragment: FullOrderParts
// ====================================================

export interface FullOrderParts_driver {
  __typename: "User";
  email: string;
}

export interface FullOrderParts_customer {
  __typename: "User";
  email: string;
  role: UserRole;
}

export interface FullOrderParts_store__geoloc {
  __typename: "latLngStore";
  lat: number;
  lng: number;
}

export interface FullOrderParts_store {
  __typename: "Store";
  name: string;
  _geoloc: FullOrderParts_store__geoloc;
}

export interface FullOrderParts {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: FullOrderParts_driver | null;
  customer: FullOrderParts_customer | null;
  store: FullOrderParts_store | null;
  mode: OrderMode;
}
