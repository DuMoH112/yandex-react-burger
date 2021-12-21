import { getCookie, setCookie, deleteCookie } from "../cookies";
import { URL_BACKEND } from "../../config/path";
import { AppDispatch, AppThunk } from "../types";
import { IUser, IUserFormData } from "../../utils/interfaces";

export const IS_REQUESTING: "IS_REQUESTING" = "IS_REQUESTING";
export const IS_FAILED: "IS_FAILED" = "IS_FAILED";
export const IS_SUCCESSFUL: "IS_SUCCESSFUL" = "IS_SUCCESSFUL";

export const SET_USER_DATA: "SET_USER_DATA" = "SET_USER_DATA";

export interface IIsRequesting {
  readonly type: typeof IS_REQUESTING;
}

export interface IIsFailed {
  readonly type: typeof IS_FAILED;
}

export interface IIsSuccessful {
  readonly type: typeof IS_SUCCESSFUL;
  readonly isAuth: boolean;
}

export interface ISetUserData {
    readonly type: typeof SET_USER_DATA;
    readonly userData: IUser;
  }

export type TUserActions = IIsRequesting | IIsFailed | IIsSuccessful | ISetUserData;

export const register: AppThunk = ({
  email,
  password,
  name,
}: IUserFormData) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: IS_REQUESTING });
    fetch(`${URL_BACKEND}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          dispatch({ type: IS_SUCCESSFUL, isAuth: true });
          setCookie("accessToken", res.accessToken, { expires: 20 * 60 });
          setCookie("refreshToken", res.refreshToken, {});
        } else {
          dispatch({ type: IS_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: IS_FAILED });
      });
  };
};

export const loginning: AppThunk = ({ email, password }: IUserFormData) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: IS_REQUESTING });
    fetch(`${URL_BACKEND}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          dispatch({ type: IS_SUCCESSFUL, isAuth: true });
          setCookie("accessToken", res.accessToken, { expires: 20 * 60 });
          setCookie("refreshToken", res.refreshToken, {});
        } else {
          dispatch({ type: IS_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: IS_FAILED });
      });
  };
};

export const loggingOut: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: IS_REQUESTING });
    fetch(`${URL_BACKEND}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("refreshToken"),
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          dispatch({ type: IS_SUCCESSFUL, isAuth: false });
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
        } else {
          dispatch({ type: IS_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: IS_FAILED });
      });
  };
};

export const refreshToken: AppThunk = () => {
  return getCookie("refreshToken") && getCookie("accessToken")
    ? function (dispatch: AppDispatch) {
        dispatch({ type: IS_SUCCESSFUL, isAuth: true });
      }
    : function (dispatch: AppDispatch) {
        dispatch({ type: IS_REQUESTING });
        fetch(`${URL_BACKEND}/auth/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: getCookie("refreshToken"),
          }),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
          })
          .then((res) => {
            if (res.success) {
              dispatch({ type: IS_SUCCESSFUL, isAuth: true });
              setCookie("accessToken", res.accessToken, { expires: 20 * 60 });
              setCookie("refreshToken", res.refreshToken, {});
            } else {
              dispatch({ type: IS_FAILED });
            }
          })
          .catch((err) => {
            dispatch({ type: IS_FAILED });
          });
      };
};

export const forgotPassword: AppThunk = ({ email }: IUserFormData) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: IS_REQUESTING });
    fetch(`${URL_BACKEND}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
        } else {
          dispatch({ type: IS_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: IS_FAILED });
      });
  };
};

export const resetPassword: AppThunk = ({ password, token }: IUserFormData) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: IS_REQUESTING });
    fetch(`${URL_BACKEND}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
        } else {
          dispatch({ type: IS_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: IS_FAILED });
      });
  };
};

export const getUserData: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: IS_REQUESTING });
    fetch(`${URL_BACKEND}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getCookie("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          dispatch({ type: SET_USER_DATA, userData: res.user });
        } else {
          dispatch({ type: IS_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: IS_FAILED });
      });
  };
};

export const patchUserData: AppThunk = ({
  name,
  email,
  password,
}: IUserFormData) => {
  return function (dispatch: AppDispatch) {
    let updatedData: any = {};
    let data: any = { name, email, password };
    for (let el in data) {
      if (data[el] !== "") updatedData[el] = data[el];
    }

    dispatch({ type: IS_REQUESTING });
    fetch(`${URL_BACKEND}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getCookie("accessToken")}`,
      },
      body: JSON.stringify({ ...updatedData }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          dispatch({ type: SET_USER_DATA, userData: res.user });
        } else {
          dispatch({ type: IS_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: IS_FAILED });
      });
  };
};
