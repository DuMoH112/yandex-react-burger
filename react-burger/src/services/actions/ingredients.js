export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const DELETE_CURRENT_INGREDIENT = "DELETE_CURRENT_INGREDIENT";


export function getIngredients() {
  const URL_API = "https://norma.nomoreparties.space/api/ingredients";

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