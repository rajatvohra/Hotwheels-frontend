/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditProductInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editProduct
// ====================================================

export interface editProduct_editProduct {
  __typename: "EditProductOutput";
  ok: boolean;
  error: string | null;
}

export interface editProduct {
  editProduct: editProduct_editProduct;
}

export interface editProductVariables {
  input: EditProductInput;
}
