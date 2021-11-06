import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT
} from '../actions/ingredients';

const initialState = {
    ingredients: [],
    constructorIngredients: [],
    currentBun: {},
    currentIngredient: {},
    order: {
        orderNumber: 0
    }
};

export const getIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return { ...state }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return { ...state, ingredients: action.data }
        }
        case GET_INGREDIENTS_FAILED: {
            return initialState
        }
        case SET_CURRENT_INGREDIENT: {
            return { ...state, currentIngredient: action.currentIngredient }
        }
        case DELETE_CURRENT_INGREDIENT: {
            return { ...state, currentIngredient: {} }
        }
        default: {
            return state;
        }
    }
};