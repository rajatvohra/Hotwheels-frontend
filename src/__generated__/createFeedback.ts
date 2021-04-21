/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FeedbackInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createFeedback
// ====================================================

export interface createFeedback_createFeedback {
  __typename: "FeedbackOutput";
  ok: boolean;
  error: string | null;
}

export interface createFeedback {
  createFeedback: createFeedback_createFeedback;
}

export interface createFeedbackVariables {
  input: FeedbackInput;
}
