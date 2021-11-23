import {
    deleteCookie,
    getCookie,
    setCookie
} from '../cookies';

export const IS_OPEN_ORDER = 'IS_OPEN_ORDER';
export const IS_OPEN_INGREDIENT = 'IS_OPEN_INGREDIENT';


export function openOrderModal() {
    return (dispatch) => { dispatch({ type: IS_OPEN_ORDER, isOpen: true }) };
}

export function closeOrderModal() {
    return (dispatch) => { dispatch({ type: IS_OPEN_ORDER, isOpen: false }) };
}

export function openIngredientModal() {
    if (!getCookie('isOpenIngredientModal')) setCookie('isOpenIngredientModal', true);
    return (dispatch) => { dispatch({ type: IS_OPEN_INGREDIENT, isOpen: true }) };
}

export function closeIngredientModal() {
    deleteCookie('isOpenIngredientModal', { path: '/' });
    return (dispatch) => {
        dispatch({ type: IS_OPEN_INGREDIENT, isOpen: false });
    };
}