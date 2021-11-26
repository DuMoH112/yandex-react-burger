import {
    IS_REQUESTING,
    IS_FAILED,
    IS_SUCCESSFUL,
    SET_USER_DATA
} from '../actions/user';
import { getCookie } from '../cookies';

const initialState = {
    isRequesting: false,
    isFailed: false,
    isAuth: Boolean(getCookie('accessToken')),
    userData: {
        email: "",
        name: ""
    }
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_REQUESTING: {
            return {
                ...state,
                isRequesting: true,
                isFailed: false
            }
        }
        case IS_FAILED: {
            return {
                ...state,
                isRequesting: false,
                isFailed: true
            }
        }
        case IS_SUCCESSFUL: {
            return {
                ...state,
                isRequesting: false,
                isAuth: action.isAuth
            }
        }
        case SET_USER_DATA: {
            return {
                ...state,
                isRequesting: false,
                userData: action.userData
            }
        }
        default: {
            return state;
        }
    }
};