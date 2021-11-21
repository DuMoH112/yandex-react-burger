import {
    getCookie,
    setCookie,
    deleteCookie
} from '../cookies';

export const IS_REQUESTING = 'IS_REQUESTING';
export const IS_FAILED = 'IS_FAILED';
export const IS_SUCCESSFUL = 'IS_SUCCESSFUL';

export const SET_USER_DATA = 'SET_USER_DATA';

export function register({ email, password, name }) {
    return function (dispatch) {
        dispatch({ type: IS_REQUESTING });
        fetch('https://norma.nomoreparties.space/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                name
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(res => {
                if (res.success) {
                    dispatch({ type: IS_SUCCESSFUL, isAuth: true });
                    setCookie('accessToken', res.accessToken, { expires: 20 * 60 });
                    setCookie('refreshToken', res.refreshToken);
                } else {
                    dispatch({ type: IS_FAILED });
                }
            })
            .catch(err => {
                dispatch({ type: IS_FAILED });
            })
    }
}

export function loginning({ email, password }) {
    return function (dispatch) {
        dispatch({ type: IS_REQUESTING });
        fetch('https://norma.nomoreparties.space/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(res => {
                if (res.success) {
                    dispatch({ type: IS_SUCCESSFUL, isAuth: true });
                    setCookie('accessToken', res.accessToken, { expires: 20 * 60 });
                    setCookie('refreshToken', res.refreshToken);
                } else {
                    dispatch({ type: IS_FAILED });
                }
            })
            .catch(err => {
                dispatch({ type: IS_FAILED });
            });
    }
}

export function loggingOut() {
    return function (dispatch) {
        dispatch({ type: IS_REQUESTING });
        fetch('https://norma.nomoreparties.space/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: getCookie('refreshToken')
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(res => {
                if (res.success) {
                    dispatch(({ type: IS_SUCCESSFUL, isAuth: false }));
                    deleteCookie('accessToken');
                    deleteCookie('refreshToken');
                } else {
                    dispatch({ type: IS_FAILED });
                }
            })
            .catch(err => {
                dispatch({ type: IS_FAILED });
            });
    }
}

export function getUserData() {
    return function (dispatch) {
        dispatch({ type: IS_REQUESTING });
        fetch('https://norma.nomoreparties.space/api/auth/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${getCookie('accessToken')}`
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(res => {
                if (res.success) {
                    dispatch({ type: SET_USER_DATA, userData: res.user })
                } else {
                    dispatch({ type: IS_FAILED });
                }
            })
            .catch(err => {
                dispatch({ type: IS_FAILED });
            });
    }
}

export function patchUserData({ name, email, password }) {
    return function (dispatch) {
        let updatedData = {};
        let data = { name, email, password };
        for (let el in data) {
            if (data[el] !== "") updatedData[el] = data[el]
        }

        dispatch({ type: IS_REQUESTING });
        fetch('https://norma.nomoreparties.space/api/auth/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${getCookie('accessToken')}`
            },
            body: JSON.stringify({ ...updatedData })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(res => {
                if (res.success) {
                    dispatch({ type: SET_USER_DATA, userData: res.user })
                } else {
                    dispatch({ type: IS_FAILED });
                }
            })
            .catch(err => {
                dispatch({ type: IS_FAILED });
            });
    }
}