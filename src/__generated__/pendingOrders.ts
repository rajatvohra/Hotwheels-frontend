/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus, UserRole, OrderMode } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: pendingOrders
// ====================================================

export interface pendingOrders_pendingOrders_driver {
  __typename: "User";
  email: string;
}

export interface pendingOrders_pendingOrders_customer {
  __typename: "User";
  email: string;
  role: UserRole;
}

export interface pendingOrders_pendingOrders_store__geoloc {
  __typename: "latLngStore";
  lat: number;
  lng: number;
}

export interface pendingOrders_pendingOrders_store {
  __typename: "Store";
  name: string;
  _geoloc: pendingOrders_pendingOrders_store__geoloc;
}

export interface pendingOrders_pendingOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: pendingOrders_pendingOrders_driver | null;
  customer: pendingOrders_pendingOrders_customer | null;
  store: pendingOrders_pendingOrders_store | null;
  mode: OrderMode;
}

export interface pendingOrders {
  pendingOrders: pendingOrders_pendingOrders;
}
