/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus, UserRole } from "./globalTypes";

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

export interface coockedOrders_packedOrders_store {
  __typename: "Store";
  name: string;
}

export interface coockedOrders_packedOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: coockedOrders_packedOrders_driver | null;
  customer: coockedOrders_packedOrders_customer | null;
  store: coockedOrders_packedOrders_store | null;
}

export interface coockedOrders {
  packedOrders: coockedOrders_packedOrders;
}
