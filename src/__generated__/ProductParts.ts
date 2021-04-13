/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductParts
// ====================================================

export interface ProductParts_options_choices {
  __typename: "ProductChoice";
  name: string;
  extra: number | null;
}

export interface ProductParts_options {
  __typename: "ProductOption";
  name: string;
  extra: number | null;
  choices: ProductParts_options_choices[] | null;
}

export interface ProductParts_category {
  __typename: "Category";
  name: string;
}

export interface ProductParts {
  __typename: "Product";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: ProductParts_options[] | null;
  category: ProductParts_category | null;
}
