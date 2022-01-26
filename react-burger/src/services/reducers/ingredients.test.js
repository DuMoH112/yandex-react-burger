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
    REPLACE_INGREDIENTS
} from '../actions/ingredients';
import { getIngredientsReducer } from "./ingredients";

const initialState = {
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

const ingredientExample1 = {
    _id: "123",
    name: "name",
    type: "bun",
    proteins: 12,
    fat: 13,
    carbohydrates: 123,
    calories: 415,
    price: 45745,
    image: "url",
    image_mobile: "url",
    image_large: "url",
    __v: 1,
}

const ingredientExample2 = {
    _id: "456",
    name: "name",
    type: "bun",
    proteins: 12,
    fat: 13,
    carbohydrates: 123,
    calories: 415,
    price: 45745,
    image: "url",
    image_mobile: "url",
    image_large: "url",
    __v: 1,
}

describe('Проверка редьюсера getIngredientsReducer', () => {
    it('Проверка начального состояния', () => {
        expect(getIngredientsReducer(undefined, { type: 'test' })).toEqual(initialState);
    })
    it('Проверка редьюсера. GET_INGREDIENTS_REQUEST', () => {
        expect(getIngredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })).toEqual({
            ...initialState,
            isRequesting: true
        })
    })
    it('Проверка редьюсера. GET_INGREDIENTS_SUCCESS', () => {
        expect(getIngredientsReducer(initialState, { type: GET_INGREDIENTS_SUCCESS, data: [ingredientExample1] })).toEqual({
            ...initialState,
            ingredients: [ingredientExample1]
        })
    })
    it('Проверка редьюсера. GET_INGREDIENTS_FAILED', () => {
        expect(getIngredientsReducer(initialState, { type: GET_INGREDIENTS_FAILED })).toEqual({
            ...initialState,
            isFailed: true
        })
    })
    it('Проверка редьюсера. GET_ORDER_NUMBER_REQUEST', () => {
        expect(getIngredientsReducer(initialState, { type: GET_ORDER_NUMBER_REQUEST })).toEqual({
            ...initialState,
            isRequesting: true
        })
    })
    it('Проверка редьюсера. GET_ORDER_NUMBER_SUCCESS', () => {
        expect(getIngredientsReducer(initialState, { type: GET_ORDER_NUMBER_SUCCESS, orderNumber: 123 })).toEqual({
            ...initialState,
            order: { orderNumber: 123 }
        })
    })
    it('Проверка редьюсера. GET_ORDER_NUMBER_FAILED', () => {
        expect(getIngredientsReducer(initialState, { type: GET_ORDER_NUMBER_FAILED })).toEqual({
            ...initialState,
            isFailed: true
        })
    })
    it('Проверка редьюсера. CLEAR_ORDER_NUMBER_SUCCESS', () => {
        expect(getIngredientsReducer(initialState, { type: CLEAR_ORDER_NUMBER_SUCCESS })).toEqual({
            ...initialState
        })
    })
    it('Проверка редьюсера. SET_CURRENT_INGREDIENT', () => {
        expect(getIngredientsReducer(initialState, { type: SET_CURRENT_INGREDIENT, currentIngredient: ingredientExample1 })).toEqual({
            ...initialState,
            currentIngredient: ingredientExample1
        })
    })
    it('Проверка редьюсера. DELETE_CURRENT_INGREDIENT', () => {
        expect(getIngredientsReducer(initialState, { type: DELETE_CURRENT_INGREDIENT })).toEqual({
            ...initialState,
            currentIngredient: {}
        })
    })
    it('Проверка редьюсера. ADD_INGREDIENT_TO_CONSTRUCTOR', () => {
        expect(getIngredientsReducer(initialState, { type: ADD_INGREDIENT_TO_CONSTRUCTOR, draggedIngredient: ingredientExample1 })).toEqual({
            ...initialState,
            constructorIngredients: [ingredientExample1]
        })
    })
    it('Проверка редьюсера. DELETE_INGREDIENT_FROM_CONSTRUCTOR', () => {
        expect(getIngredientsReducer({
            ...initialState,
            constructorIngredients: [ingredientExample1]
        }, { type: DELETE_INGREDIENT_FROM_CONSTRUCTOR, id: "123" })).toEqual({
            ...initialState
        })
    })
    it('Проверка редьюсера. CLEAR_CONSTRUCTOR', () => {
        expect(getIngredientsReducer({
            ...initialState,
            constructorIngredients: [ingredientExample1]
        }, { type: CLEAR_CONSTRUCTOR })).toEqual({
            ...initialState,
        })
    })
    it('Проверка редьюсера. ADD_BUN_TO_CONSTRUCTOR', () => {
        expect(getIngredientsReducer(initialState, { type: ADD_BUN_TO_CONSTRUCTOR, draggedIngredient: ingredientExample1 })).toEqual({
            ...initialState,
            currentBun: ingredientExample1
        })
    })
    it('Проверка редьюсера. DELETE_BUN_FROM_CONSTRUCTOR', () => {
        expect(getIngredientsReducer(initialState, { type: DELETE_BUN_FROM_CONSTRUCTOR })).toEqual({
            ...initialState
        })
    })
    it('Проверка редьюсера. REPLACE_INGREDIENTS', () => {
        expect(getIngredientsReducer({
            ...initialState,
            constructorIngredients: [ingredientExample1, ingredientExample2]
        }, {
            type: REPLACE_INGREDIENTS, payload: {
                dragIndex: 0,
                hoverIndex: 1
            }
        })).toEqual({
            ...initialState,
            constructorIngredients: [ingredientExample2, ingredientExample1]
        })
    })
});