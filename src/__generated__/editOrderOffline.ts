/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editOrderOffline
// ====================================================

export interface editOrderOffline_editOrderOffline {
  __typename: "EditOrderOutput";
  ok: boolean;
  error: string | null;
}

export interface editOrderOffline {
  editOrderOffline: editOrderOffline_editOrderOffline;
}

export interface editOrderOfflineVariables {
  input: EditOrderInput;
}
