/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderMode {
  Offline = "Offline",
  Online = "Online",
}

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
  _geoloc?: lntLngUserType | null;
  role: UserRole;
}

export interface CreateOrderInput {
  storeId: number;
  productId: number;
  quantity: number;
}

export interface CreateOrderOfflineInput {
  storeId: number;
  productId: number;
  quantity: number;
}

export interface CreateProductInput {
  name: string;
  price: number;
  photo?: string | null;
  description: string;
  options?: ProductOptionInputType[] | null;
  stocks?: number | null;
  storeId: number;
  categoryName: string;
}

export interface CreateStoreInput {
  name: string;
  coverImg: string;
  address: string;
  _geoloc?: lntLngStoreType | null;
}

export interface DeleteProductInput {
  productId: number;
}

export interface DeleteStoreInput {
  storeId: number;
}

export interface EditOrderInput {
  id: number;
  status: OrderStatus;
}

export interface EditProductInput {
  name?: string | null;
  price?: number | null;
  photo?: string | null;
  description?: string | null;
  options?: ProductOptionInputType[] | null;
  stocks?: number | null;
  dateNextAvailable?: string | null;
  productId: number;
  categoryName?: string | null;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
  location?: string | null;
  _geoloc?: lntLngUserType | null;
}

export interface FeedbackInput {
  complaint: string;
  productId: number;
}

export interface FeedbacksInput {
  page?: number | null;
  productId: number;
}

export interface FilterProductInput {
  page?: number | null;
  radiusInKm?: number | null;
}

export interface GetOrderInput {
  id: number;
}

export interface GetOrdersInput {
  status?: OrderStatus | null;
}

export interface LoginInput {
  email: string;
  password: string;
  _geoloc?: lntLngUserType | null;
}

export interface MyStoreInput {
  id: number;
}

export interface OTPInput {
  id: number;
  otp: number;
}

export interface OrderUpdatesInput {
  id: number;
}

export interface ProductChoiceInputType {
  name: string;
  extra?: number | null;
}

export interface ProductInput {
  productId: number;
}

export interface ProductOptionInputType {
  name: string;
  choices?: ProductChoiceInputType[] | null;
  extra?: number | null;
}

export interface ProductsInput {
  page?: number | null;
}

export interface SearchProductInput {
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

export interface lntLngStoreType {
  lat?: number | null;
  lng?: number | null;
}

export interface lntLngUserType {
  lat?: number | null;
  lng?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
