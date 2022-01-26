import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_USER_CONNECTION_START,
    WS_USER_CONNECTION_SUCCESS,
    WS_USER_CONNECTION_CLOSED,
    WS_USER_CONNECTION_ERROR,
    WS_USER_GET_MESSAGE,
    ORDER_SET_CURRENT_ORDER,
    ORDER_DELETE_CURRENT_ORDER,
} from "../actions/orders";
import { orderReducer } from "./orders";

const initialState = {
    wsConnected: false,
    currentOrder: null,
    orders: {
        success: false,
        total: 0,
        totalToday: 0,
        orders: [],
    },
};

const orderItemExample = {
    ingredients: ["a1", "a2"],
    _id: "id",
    name: "name",
    status: "done",
    number: 1,
    createdAt: "12-01-2021",
    updatedAt: "12-01-2021",
}

describe('Проверка редьюсера orderReducer', () => {
    it('Проверка начального состояния', () => {
        expect(orderReducer(undefined, { type: 'test' })).toEqual(initialState);
    })
    it('Проверка редьюсера. WS_CONNECTION_START', () => {
        expect(orderReducer(initialState, { type: WS_CONNECTION_START })).toEqual({
            ...initialState
        })
    })
    it('Проверка редьюсера. WS_CONNECTION_SUCCESS', () => {
        expect(orderReducer(initialState, { type: WS_CONNECTION_SUCCESS })).toEqual({
            ...initialState,
            wsConnected: true
        })
    })
    it('Проверка редьюсера. WS_CONNECTION_CLOSED', () => {
        expect(orderReducer(initialState, { type: WS_CONNECTION_CLOSED })).toEqual({
            ...initialState
        })
    })
    it('Проверка редьюсера. WS_CONNECTION_ERROR', () => {
        expect(orderReducer(initialState, { type: WS_CONNECTION_ERROR })).toEqual({
            ...initialState
        })
    })
    it('Проверка редьюсера. WS_GET_MESSAGE', () => {
        expect(orderReducer(initialState, { type: WS_GET_MESSAGE, payload: "Message" })).toEqual({
            ...initialState,
            orders: "Message"
        })
    })

    it('Проверка редьюсера. WS_USER_CONNECTION_START', () => {
        expect(orderReducer(initialState, { type: WS_USER_CONNECTION_START })).toEqual({
            ...initialState
        })
    })
    it('Проверка редьюсера. WS_USER_CONNECTION_SUCCESS', () => {
        expect(orderReducer(initialState, { type: WS_USER_CONNECTION_SUCCESS })).toEqual({
            ...initialState,
            wsConnected: true
        })
    })
    it('Проверка редьюсера. WS_USER_CONNECTION_CLOSED', () => {
        expect(orderReducer(initialState, { type: WS_USER_CONNECTION_CLOSED })).toEqual({
            ...initialState
        })
    })
    it('Проверка редьюсера. WS_USER_CONNECTION_ERROR', () => {
        expect(orderReducer(initialState, { type: WS_USER_CONNECTION_ERROR })).toEqual({
            ...initialState
        })
    })
    it('Проверка редьюсера. WS_USER_GET_MESSAGE', () => {
        expect(orderReducer(initialState, { type: WS_USER_GET_MESSAGE, payload: "Message" })).toEqual({
            ...initialState,
            orders: "Message"
        })
    })

    it('Проверка редьюсера. ORDER_SET_CURRENT_ORDER', () => {
        expect(orderReducer(initialState, { type: ORDER_SET_CURRENT_ORDER, currentOrder: orderItemExample })).toEqual({
            ...initialState,
            currentOrder: orderItemExample
        })
    })
    it('Проверка редьюсера. ORDER_DELETE_CURRENT_ORDER', () => {
        expect(orderReducer(initialState, { type: ORDER_DELETE_CURRENT_ORDER })).toEqual({
            ...initialState
        })
    })
});