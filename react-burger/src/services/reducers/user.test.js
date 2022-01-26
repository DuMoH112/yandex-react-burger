import {
    IS_REQUESTING,
    IS_FAILED,
    IS_SUCCESSFUL,
    SET_USER_DATA
} from "../actions/user";
import { userReducer } from "./user";

const initialState = {
    isRequesting: false,
    isFailed: false,
    isAuth: false,
    userData: {
        email: "",
        name: "",
    },
};

const initialStateRequest = {
    isRequesting: true,
    isFailed: false,
    isAuth: false,
    userData: {
        email: "",
        name: "",
    },
  };

describe('Проверка редьюсера userReducer', () => {
    it('Проверка начального состояния', () => {
        expect(userReducer(undefined, { type: 'test' })).toEqual(initialState);
    })
    it('Проверка редьюсера. IS_REQUESTING', () => {
        expect(userReducer(initialState, { type: IS_REQUESTING })).toEqual({
            ...initialStateRequest
        })
    })
    it('Проверка редьюсера. IS_SUCCESSFUL', () => {
        expect(userReducer(initialStateRequest, { type: IS_SUCCESSFUL, isAuth: true })).toEqual({
            ...initialState,
            isAuth: true
        })
    })
    it('Проверка редьюсера. IS_FAILED', () => {
        expect(userReducer(initialStateRequest, { type: IS_FAILED })).toEqual({
            ...initialState,
            isFailed: true,
        })
    })
    it('Проверка редьюсера. SET_USER_DATA', () => {
        expect(userReducer(initialState, {
            type: SET_USER_DATA, userData: {
                email: "testEmail@mail.com",
                name: "testName"
            }
        })).toEqual({
            ...initialState,
            userData: {
                email: "testEmail@mail.com",
                name: "testName"
            },
        })
    })
});