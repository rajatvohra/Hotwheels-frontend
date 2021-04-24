/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOrderOfflineInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createOrderOffline
// ====================================================

export interface createOrderOffline_createOrderOffline {
  __typename: "CreateOrderOfflineOutput";
  ok: boolean;
  error: string | null;
  orderId: number | null;
}

export interface createOrderOffline {
  createOrderOffline: createOrderOffline_createOrderOffline;
}

export interface createOrderOfflineVariables {
  input: CreateOrderOfflineInput;
}
