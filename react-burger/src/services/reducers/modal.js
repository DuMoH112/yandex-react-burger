import {
    IS_OPEN_ORDER,
    IS_OPEN_INGREDIENT
} from '../actions/modal';

const initialState = {
    isOpenModalOrder: false,
    isOpenModalIngredient: false
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_OPEN_ORDER: {
            return {
                ...state,
                isOpenModalOrder: action.isOpen,
            }
        }
        case IS_OPEN_INGREDIENT: {
            return {
                ...state,
                isOpenModalIngredient: action.isOpen,
            }
        } 
        default: {
            return state;
        }
    }
};