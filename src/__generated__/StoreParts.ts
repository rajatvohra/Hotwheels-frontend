/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: StoreParts
// ====================================================

export interface StoreParts_category {
  __typename: "Category";
  name: string;
}

export interface StoreParts {
  __typename: "Store";
  id: number;
  name: string;
  coverImg: string;
  category: StoreParts_category | null;
  address: string;
}
