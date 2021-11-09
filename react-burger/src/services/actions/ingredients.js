import URL_BACKEND from '../../../config/path'

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";

export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const DELETE_CURRENT_INGREDIENT = "DELETE_CURRENT_INGREDIENT";

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR = 'DELETE_INGREDIENT_FROM_CONSTRUCTOR';
export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
export const DELETE_BUN_FROM_CONSTRUCTOR = 'DELETE_BUN_FROM_CONSTRUCTOR';

export const REPLACE_INGREDIENTS = 'REPLACE_INGREDIENTS';


export function getIngredients() {
  const URL_API = `${URL_BACKEND}/ingredients`;

  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    })
    fetch(URL_API).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
      .then(data =>
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: data.data
        }))
      .catch(e => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
        console.log("Error: " + e.message);
      });
  }
}

export function getOrderNumber(ingredients) {
  const URL_API_ORDER = `${URL_BACKEND}/orders`;

  return (dispatch) => {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
    });

    const data = {
      "ingredients": ingredients.map(item => item._id)
    };

    fetch(
      URL_API_ORDER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          orderNumber: data.order.number
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED
        })
        console.error('Error:', error);
      });
  }
}

export const replaceItems = (dragIndex, hoverIndex) => {
  return (dispatch) => {
    dispatch({
      type: REPLACE_INGREDIENTS,
      payload: {
        dragIndex: dragIndex,
        hoverIndex: hoverIndex
      }
    })
  }
}