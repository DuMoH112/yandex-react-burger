import { URL_BACKEND } from "../../config/path";
import { IIngredient } from "../../utils/interfaces";
import { AppDispatch, AppThunk } from "../types";
import { getCookie } from "../cookies";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

export const GET_ORDER_NUMBER_REQUEST: "GET_ORDER_NUMBER_REQUEST" = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS: "GET_ORDER_NUMBER_SUCCESS" = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED: "GET_ORDER_NUMBER_FAILED" = "GET_ORDER_NUMBER_FAILED";
export const CLEAR_ORDER_NUMBER_SUCCESS: "CLEAR_ORDER_NUMBER_SUCCESS" = "CLEAR_ORDER_NUMBER_SUCCESS";

export const SET_CURRENT_INGREDIENT: "SET_CURRENT_INGREDIENT" = "SET_CURRENT_INGREDIENT";
export const DELETE_CURRENT_INGREDIENT: "DELETE_CURRENT_INGREDIENT" = "DELETE_CURRENT_INGREDIENT";

export const ADD_INGREDIENT_TO_CONSTRUCTOR: "ADD_INGREDIENT_TO_CONSTRUCTOR" = "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR: "DELETE_INGREDIENT_FROM_CONSTRUCTOR" = "DELETE_INGREDIENT_FROM_CONSTRUCTOR";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";
export const ADD_BUN_TO_CONSTRUCTOR: "ADD_BUN_TO_CONSTRUCTOR" = "ADD_BUN_TO_CONSTRUCTOR";
export const DELETE_BUN_FROM_CONSTRUCTOR: "DELETE_BUN_FROM_CONSTRUCTOR" = "DELETE_BUN_FROM_CONSTRUCTOR";

export const REPLACE_INGREDIENTS: "REPLACE_INGREDIENTS" = "REPLACE_INGREDIENTS";

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: IIngredient[];
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetOrderNumberRequest {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumberSuccess {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly orderNumber: number;
}

export interface IGetOrderNumberFailed {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface IClearOrderNumberSuccess {
  readonly type: typeof CLEAR_ORDER_NUMBER_SUCCESS;
}

export interface ISetCurrentIngredient {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  readonly currentIngredient: number;
}

export interface IDeleteCurrentIngredient {
  readonly type: typeof DELETE_CURRENT_INGREDIENT;
  readonly currentIngredient: object;
}

export interface IAddIngredientToConstructor {
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly draggedIngredient: IIngredient;
}

export interface IDeleteIngredientFromConstructor {
  readonly type: typeof DELETE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly id: string;
}

export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export interface IAddBunToConstructor {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
  readonly draggedIngredient: IIngredient;
}

export interface IDeleteBunFromConstructor {
  readonly type: typeof DELETE_BUN_FROM_CONSTRUCTOR;
}

export interface IReplaceIngredients {
  readonly type: typeof REPLACE_INGREDIENTS;
  readonly payload: {
    dragIndex: number;
    hoverIndex: number;
  };
}

export type TIgredientsAndOrdersActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed
  | IGetOrderNumberRequest
  | IGetOrderNumberSuccess
  | IGetOrderNumberFailed
  | IClearOrderNumberSuccess
  | ISetCurrentIngredient
  | IDeleteCurrentIngredient
  | IAddIngredientToConstructor
  | IDeleteIngredientFromConstructor
  | IClearConstructor
  | IAddBunToConstructor
  | IDeleteBunFromConstructor
  | IReplaceIngredients;

export const getIngredients: AppThunk = () => {
  const URL_API = `${URL_BACKEND}/ingredients`;

  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetch(URL_API)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((data) =>
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: data.data,
        })
      )
      .catch((e) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        console.log("Error: " + e.message);
      });
  };
};

export const getOrderNumber: AppThunk = (ingredients: IIngredient[]) => {
  const URL_API_ORDER = `${URL_BACKEND}/orders`;

  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
    });

    const data = {
      ingredients: ingredients.map((item) => item._id),
    };

    fetch(URL_API_ORDER, {
      method: "POST",
      headers: {
        authorization: `${getCookie("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          orderNumber: data.order.number,
        });
        dispatch({ type: CLEAR_CONSTRUCTOR });
        dispatch({ type: DELETE_BUN_FROM_CONSTRUCTOR });
      })
      .catch((error) => {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
        });
        console.error("Error:", error);
      });
  };
};

export const replaceItems: AppThunk = (
  dragIndex: number,
  hoverIndex: number
) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: REPLACE_INGREDIENTS,
      payload: {
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      },
    });
  };
};
