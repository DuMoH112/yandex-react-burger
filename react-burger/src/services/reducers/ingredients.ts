import { IBurgerIngredients } from '../../utils/interfaces';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
    CLEAR_ORDER_NUMBER_SUCCESS,
    SET_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR,
    ADD_BUN_TO_CONSTRUCTOR,
    DELETE_BUN_FROM_CONSTRUCTOR,
    REPLACE_INGREDIENTS,
    TIgredientsAndOrdersActions
} from '../actions/ingredients';

const initialState: IBurgerIngredients = {
    isRequesting: false,
    isFailed: false,
    ingredients: [],
    constructorIngredients: [],
    currentBun: null,
    currentIngredient: null,
    order: {
        orderNumber: 0
    }
};

export const getIngredientsReducer = (state = initialState, action: TIgredientsAndOrdersActions) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                isRequesting: true,
                isFailed: false
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                isRequesting: false,
                isFailed: false,
                ingredients: action.data
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                isRequesting: false,
                isFailed: true
            }
        }
        case GET_ORDER_NUMBER_REQUEST: {
            return {
                ...state,
                isRequesting: true,
                isFailed: false
            }
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                isRequesting: false,
                isFailed: false,
                order: { orderNumber: action.orderNumber }
            }
        }
        case CLEAR_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                order: { orderNumber: 0 }
            }
        }
        case GET_ORDER_NUMBER_FAILED: {
            return {
                ...state,
                isRequesting: false,
                isFailed: true,
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