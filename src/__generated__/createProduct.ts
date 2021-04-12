/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateProductInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createProduct
// ====================================================

export interface createProduct_createProduct {
  __typename: "CreateProductOutput";
  ok: boolean;
  error: string | null;
}

export interface createProduct {
  createProduct: createProduct_createProduct;
}

export interface createProductVariables {
  input: CreateProductInput;
}
