import React from "react";

export interface IEditedInput {
  value: string;
  type?: "text" | "email" | "password";
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateFunction?: Function;
  size?: "default" | "small";
}

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IBurgerIngredients {
  isRequesting: boolean;
  isFailed: boolean;
  ingredients: Array<IIngredient>;
  constructorIngredients: Array<IIngredient>;
  currentBun: IIngredient | null;
  currentIngredient: IIngredient | null;
  order: { orderNumber: number };
}

export interface IModal {
  isOpenModalOrder: boolean;
  isOpenModalIngredient: boolean;
  isOpenModalOrderDetails: boolean;
}

export interface IUser {
  isRequesting: boolean;
  isFailed: boolean;
  isAuth: boolean;
  userData: {
    email: string;
    name: string;
  };
}

export interface IUserFormData {
  email?: string;
  password?: string;
  name?: string;
  token?: string;
}

export interface IOrderItem {
  ingredients: string[];
  _id: string;
  name: string;
  status: "done" | "pending" | "created";
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  success: boolean;
  total: number;
  totalToday: number;
  orders: Array<IOrderItem>;
}

export interface IOrderNumbers {
  done: number[];
  pending: number[];
}

export interface IOrderState {
  wsConnected: boolean;
  currentOrder: IOrderItem | null;
  orders: IOrder;
}
