import { combineReducers } from "redux";

import { getIngredientsReducer } from './ingredients'

export const rootReducer = combineReducers({
    burgerIngredients: getIngredientsReducer
}); 