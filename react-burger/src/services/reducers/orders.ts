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

import { IOrderState } from "../../utils/interfaces";
import { TWsActions } from "../actions/orders";

const initialState: IOrderState = {
  wsConnected: false,
  currentOrder: null,
  orders: {
    success: false,
    total: 0,
    totalToday: 0,
    orders: [],
  },
};

export const orderReducer = (state = initialState, action: TWsActions) => {
  switch (action.type) {
    case WS_CONNECTION_START:
    case WS_USER_CONNECTION_START: {
      return {
        ...state,
      };
    }
    case WS_CONNECTION_SUCCESS:
    case WS_USER_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_CONNECTION_CLOSED:
    case WS_USER_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        orders: {
          success: false,
          total: 0,
          totalToday: 0,
          orders: [],
        },
      };
    }
    case WS_CONNECTION_ERROR:
    case WS_USER_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
      };
    }
    case WS_GET_MESSAGE:
    case WS_USER_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload,
      };
    }
    case ORDER_SET_CURRENT_ORDER: {
      return {
        ...state,
        currentOrder: action.currentOrder,
      };
    }
    case ORDER_DELETE_CURRENT_ORDER: {
      return {
        ...state,
        currentOrder: null,
      };
    }
    default: {
      return state;
    }
  }
};
