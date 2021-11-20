import { combineReducers } from "redux";

import { getIngredientsReducer } from './ingredients'
import { userReducer } from "./user";

export const rootReducer = combineReducers({
    burgerIngredients: getIngredientsReducer,
    user: userReducer
});