/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteStoreInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteStore
// ====================================================

export interface deleteStore_deleteStore {
  __typename: "DeleteStoreOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteStore {
  deleteStore: deleteStore_deleteStore;
}

export interface deleteStoreVariables {
  deletestoreinput: DeleteStoreInput;
}
