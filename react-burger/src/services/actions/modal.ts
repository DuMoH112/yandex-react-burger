import { deleteCookie, getCookie, setCookie } from "../cookies";

export const IS_OPEN_ORDER: "IS_OPEN_ORDER" = "IS_OPEN_ORDER";
export const IS_OPEN_INGREDIENT: "IS_OPEN_INGREDIENT" = "IS_OPEN_INGREDIENT";
export const IS_OPEN_ORDER_DETAILS: "IS_OPEN_ORDER_DETAILS" = "IS_OPEN_ORDER_DETAILS";

export interface IOpenOrderModal {
  readonly type: typeof IS_OPEN_ORDER;
  readonly isOpen: boolean;
}

export interface IOpenIngredientModal {
  readonly type: typeof IS_OPEN_INGREDIENT;
  readonly isOpen: boolean;
}

export interface IOpenOrderDetailsModal {
  readonly type: typeof IS_OPEN_ORDER_DETAILS;
  readonly isOpen: boolean;
}

export type TOpenModalActions =
  | IOpenOrderModal
  | IOpenIngredientModal
  | IOpenOrderDetailsModal;

export const openOrderModal = () => {
  return { type: IS_OPEN_ORDER, isOpen: true };
};

export const closeOrderModal = () => {
  return { type: IS_OPEN_ORDER, isOpen: false };
};

export const openIngredientModal = () => {
  if (!getCookie("isOpenIngredientModal"))
    setCookie("isOpenIngredientModal", true, {});
  return { type: IS_OPEN_INGREDIENT, isOpen: true };
};

export const closeIngredientModal = () => {
  deleteCookie("isOpenIngredientModal", { path: "/" });
  return { type: IS_OPEN_INGREDIENT, isOpen: false };
};

export const openOrderDetailsModal = () => {
  return { type: IS_OPEN_ORDER_DETAILS, isOpen: true };
};

export const closeOrderDetailsModal = () => {
  return { type: IS_OPEN_ORDER_DETAILS, isOpen: false };
};
