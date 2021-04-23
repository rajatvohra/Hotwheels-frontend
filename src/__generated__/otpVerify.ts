/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OTPInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: otpVerify
// ====================================================

export interface otpVerify_otpVerify {
  __typename: "OTPOutput";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface otpVerify {
  otpVerify: otpVerify_otpVerify;
}

export interface otpVerifyVariables {
  input: OTPInput;
}
