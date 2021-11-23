import { combineReducers } from "redux";

import { getIngredientsReducer } from './ingredients'
import { modalReducer } from "./modal";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
    modal: modalReducer,
    burgerIngredients: getIngredientsReducer,
    user: userReducer
});