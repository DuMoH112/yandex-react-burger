import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
    SET_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR,
    ADD_BUN_TO_CONSTRUCTOR,
    DELETE_BUN_FROM_CONSTRUCTOR,
    REPLACE_INGREDIENTS
} from '../actions/ingredients';

const initialState = {
    ingredients: [],
    constructorIngredients: [],
    currentBun: null,
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
        case GET_ORDER_NUMBER_REQUEST: {
            return { ...state }
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                order: { orderNumber: action.orderNumber }
            }
        }
        case GET_ORDER_NUMBER_FAILED: {
            return {
                ...state,
                order: { orderNumber: 0 }
            }
        }
        case SET_CURRENT_INGREDIENT: {
            return { ...state, currentIngredient: action.currentIngredient }
        }
        case DELETE_CURRENT_INGREDIENT: {
            return { ...state, currentIngredient: {} }
        }
        case ADD_INGREDIENT_TO_CONSTRUCTOR: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients, action.draggedIngredient]
            }
        }
        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                constructorIngredients: []
            }
        }
        case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
            let itemToDeleteIndex = state.constructorIngredients.map(item => item._id).indexOf(action.id);

            return {
                ...state,
                constructorIngredients: state.constructorIngredients.filter((item, index) => index !== itemToDeleteIndex)
            }
        }
        case ADD_BUN_TO_CONSTRUCTOR: {
            return { ...state, currentBun: action.draggedIngredient }
        }
        case DELETE_BUN_FROM_CONSTRUCTOR: {
            return { ...state, currentBun: null }
        }
        case REPLACE_INGREDIENTS: {
            const replacedConstructorIngredients = [...state.constructorIngredients];
            const draggedIngredient = replacedConstructorIngredients[action.payload.dragIndex];
            replacedConstructorIngredients.splice(action.payload.dragIndex, 1);
            replacedConstructorIngredients.splice(action.payload.hoverIndex, 0, draggedIngredient);

            return {
                ...state,
                constructorIngredients: replacedConstructorIngredients
            } 
        }
        default: {
            return state;
        }
    }
};