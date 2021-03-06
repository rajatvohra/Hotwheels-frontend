/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus, UserRole, OrderMode } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: coockedOrders
// ====================================================

export interface coockedOrders_packedOrders_driver {
  __typename: "User";
  email: string;
}

export interface coockedOrders_packedOrders_customer {
  __typename: "User";
  email: string;
  role: UserRole;
}

export interface coockedOrders_packedOrders_store__geoloc {
  __typename: "latLngStore";
  lat: number;
  lng: number;
}

export interface coockedOrders_packedOrders_store {
  __typename: "Store";
  name: string;
  _geoloc: coockedOrders_packedOrders_store__geoloc;
}

export interface coockedOrders_packedOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: coockedOrders_packedOrders_driver | null;
  customer: coockedOrders_packedOrders_customer | null;
  store: coockedOrders_packedOrders_store | null;
  mode: OrderMode;
}

export interface coockedOrders {
  packedOrders: coockedOrders_packedOrders;
}
