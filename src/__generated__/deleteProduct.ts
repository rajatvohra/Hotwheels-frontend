/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteProductInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteProduct
// ====================================================

export interface deleteProduct_deleteProduct {
  __typename: "DeleteProductOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteProduct {
  deleteProduct: deleteProduct_deleteProduct;
}

export interface deleteProductVariables {
  deleteproductinput: DeleteProductInput;
}
