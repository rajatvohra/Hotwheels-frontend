/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FeedbacksInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: feedbacks
// ====================================================

export interface feedbacks_feedbacks_results_customer {
  __typename: "User";
  email: string;
}

export interface feedbacks_feedbacks_results {
  __typename: "Feedback";
  complaint: string;
  customer: feedbacks_feedbacks_results_customer;
  createdAt: any;
}

export interface feedbacks_feedbacks {
  __typename: "FeedbacksOutput";
  error: string | null;
  ok: boolean;
  totalPages: number | null;
  totalResults: number | null;
  results: feedbacks_feedbacks_results[] | null;
}

export interface feedbacks {
  feedbacks: feedbacks_feedbacks;
}

export interface feedbacksVariables {
  input: FeedbacksInput;
}
