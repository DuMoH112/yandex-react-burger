import { combineReducers } from "redux";

import { getIngredientsReducer } from "./ingredients";
import { modalReducer } from "./modal";
import { orderReducer } from "./orders";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  modal: modalReducer,
  burgerIngredients: getIngredientsReducer,
  user: userReducer,
  orders: orderReducer,
});
