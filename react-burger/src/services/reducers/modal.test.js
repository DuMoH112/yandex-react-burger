import {
    IS_OPEN_ORDER,
    IS_OPEN_INGREDIENT,
    IS_OPEN_ORDER_DETAILS
} from '../actions/modal';
import { modalReducer } from "./modal";

const initialState = {
    isOpenModalOrder: false,
    isOpenModalIngredient: false,
    isOpenModalOrderDetails: false,
};

describe('Проверка редьюсера modalReducer', () => {
    it('Проверка начального состояния', () => {
        expect(modalReducer(undefined, { type: 'test' })).toEqual(initialState);
    })
    it('Проверка редьюсера. IS_OPEN_ORDER', () => {
        expect(modalReducer(initialState, { type: IS_OPEN_ORDER, isOpen: true })).toEqual({
            ...initialState,
            isOpenModalOrder: true
        })
    })
    it('Проверка редьюсера. IS_OPEN_INGREDIENT', () => {
        expect(modalReducer(initialState, { type: IS_OPEN_INGREDIENT, isOpen: true })).toEqual({
            ...initialState,
            isOpenModalIngredient: true
        })
    })
    it('Проверка редьюсера. IS_OPEN_ORDER_DETAILS', () => {
        expect(modalReducer(initialState, { type: IS_OPEN_ORDER_DETAILS, isOpen: true })).toEqual({
            ...initialState,
            isOpenModalOrderDetails: true
        })
    })
});