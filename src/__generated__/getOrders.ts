/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrdersInput, OrderMode, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOrders
// ====================================================

export interface getOrders_getOrders_orders_product {
  __typename: "Product";
  name: string;
  photo: string | null;
  id: number;
}

export interface getOrders_getOrders_orders_driver {
  __typename: "User";
  id: number;
  email: string;
}

export interface getOrders_getOrders_orders_store {
  __typename: "Store";
  id: number;
  name: string;
}

export interface getOrders_getOrders_orders {
  __typename: "Order";
  id: number;
  mode: OrderMode;
  quantity: number;
  status: OrderStatus;
  FeedbackExists: boolean;
  product: getOrders_getOrders_orders_product;
  driver: getOrders_getOrders_orders_driver | null;
  store: getOrders_getOrders_orders_store | null;
}

export interface getOrders_getOrders {
  __typename: "GetOrdersOutput";
  ok: boolean;
  error: string | null;
  orders: getOrders_getOrders_orders[] | null;
}

export interface getOrders {
  getOrders: getOrders_getOrders;
}

export interface getOrdersVariables {
  input: GetOrdersInput;
}
