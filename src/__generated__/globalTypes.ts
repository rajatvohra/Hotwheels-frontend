/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  Delivered = "Delivered",
  Packed = "Packed",
  Packing = "Packing",
  Pending = "Pending",
  PickedUp = "PickedUp",
}

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
  Retailer = "Retailer",
}

export interface CategoryInput {
  page?: number | null;
  slug: string;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  location: string;
  role: UserRole;
}

export interface CreateOrderInput {
  storeId: number;
  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {
  productId: number;
  options?: OrderItemOptionInputType[] | null;
}

export interface CreateProductInput {
  name: string;
  price: number;
  description: string;
  options?: ProductOptionInputType[] | null;
  storeId: number;
}

export interface CreateStoreInput {
  name: string;
  coverImg: string;
  address: string;
  categoryName: string;
}

export interface DeleteStoreInput {
  storeId: number;
}

export interface EditOrderInput {
  id: number;
  status: OrderStatus;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
  location?: string | null;
}

export interface GetOrderInput {
  id: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MyStoreInput {
  id: number;
}

export interface OTPInput {
  id: number;
  otp: number;
}

export interface OrderItemOptionInputType {
  name: string;
  choice?: string | null;
}

export interface OrderUpdatesInput {
  id: number;
}

export interface ProductChoiceInputType {
  name: string;
  extra?: number | null;
}

export interface ProductOptionInputType {
  name: string;
  choices?: ProductChoiceInputType[] | null;
  extra?: number | null;
}

export interface SearchStoreInput {
  page?: number | null;
  query: string;
}

export interface StoreInput {
  storeId: number;
}

export interface StoresInput {
  page?: number | null;
}

export interface TakeOrderInput {
  id: number;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
