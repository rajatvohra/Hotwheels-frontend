/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allCategories
// ====================================================

export interface allCategories_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  productCount: number;
}

export interface allCategories_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: allCategories_allCategories_categories[] | null;
}

export interface allCategories {
  allCategories: allCategories_allCategories;
}
