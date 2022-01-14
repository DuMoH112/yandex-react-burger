import { IOrder, IOrderItem } from '../../utils/interfaces';

export const WS_CONNECTION_START:'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS:'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_CLOSED:'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ERROR:'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_GET_MESSAGE:'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';

export const WS_USER_CONNECTION_START:'WS_USER_CONNECTION_START' = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS:'WS_USER_CONNECTION_SUCCESS' = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_CONNECTION_CLOSED:'WS_USER_CONNECTION_CLOSED' = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_CONNECTION_ERROR:'WS_USER_CONNECTION_ERROR' = 'WS_USER_CONNECTION_ERROR';
export const WS_USER_GET_MESSAGE:'WS_USER_GET_MESSAGE' = 'WS_USER_GET_MESSAGE';


export const ORDER_SET_CURRENT_ORDER: "ORDER_SET_CURRENT_ORDER" = "ORDER_SET_CURRENT_ORDER";
export const ORDER_DELETE_CURRENT_ORDER: "ORDER_DELETE_CURRENT_ORDER" = "ORDER_DELETE_CURRENT_ORDER";

export const wsOrdersActions = {
  WS_CONNECTION_START: WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS: WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED: WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR: WS_CONNECTION_ERROR,
  WS_GET_MESSAGE: WS_GET_MESSAGE
}

export const wsUserOrdersActions = {
  WS_CONNECTION_START: WS_USER_CONNECTION_START,
  WS_CONNECTION_SUCCESS: WS_USER_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED: WS_USER_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR: WS_USER_CONNECTION_ERROR,
  WS_GET_MESSAGE: WS_USER_GET_MESSAGE
}

export interface IWsOrderConnectionStart {
  readonly type: typeof WS_CONNECTION_START
}

export interface IWsOrderConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWsOrderConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWsOrderConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR
}

export interface IWsOrderGetMessage {
  readonly type: typeof WS_GET_MESSAGE
  readonly payload: IOrder
}

export interface IWsUserOrderConnectionStart {
  readonly type: typeof WS_USER_CONNECTION_START
}

export interface IWsUserOrderConnectionSuccess {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS
}

export interface IWsUserOrderConnectionClosed {
  readonly type: typeof WS_USER_CONNECTION_CLOSED
}

export interface IWsUserOrderConnectionError {
  readonly type: typeof WS_USER_CONNECTION_ERROR
}

export interface IWsUserOrderGetMessage {
  readonly type: typeof WS_USER_GET_MESSAGE
  readonly payload: IOrder
}

export interface IOrderSetCurrentIngredient {
  readonly type: typeof ORDER_SET_CURRENT_ORDER
  readonly currentOrder: IOrderItem
}

export interface IOrderDeleteCurrentIngredient {
  readonly type: typeof ORDER_DELETE_CURRENT_ORDER
}

export type TWsActions = 
  | IWsOrderConnectionStart
  | IWsOrderConnectionSuccess
  | IWsOrderConnectionClosed
  | IWsOrderConnectionError
  | IWsOrderGetMessage
  | IWsUserOrderConnectionStart
  | IWsUserOrderConnectionSuccess
  | IWsUserOrderConnectionClosed
  | IWsUserOrderConnectionError
  | IWsUserOrderGetMessage
  | IOrderSetCurrentIngredient
  | IOrderDeleteCurrentIngredient;

export const wsOrderConnectionStart = (): IWsOrderConnectionStart => ({
  type: WS_CONNECTION_START
});

export const wsOrderConnectionSuccess = (): IWsOrderConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS
});

export const wsOrderConnectionClosed = (): IWsOrderConnectionClosed => ({
  type: WS_CONNECTION_CLOSED
});

export const wsOrderConnectionError = (): IWsOrderConnectionError => ({
  type: WS_CONNECTION_ERROR
});

export const wsOrderGetMessage = (orders: IOrder): IWsOrderGetMessage => ({
  type: WS_GET_MESSAGE,
  payload: orders
});

export const wsUserOrderConnectionStart = (): IWsUserOrderConnectionStart => ({
  type: WS_USER_CONNECTION_START
});

export const wsUserOrderConnectionSuccess = (): IWsUserOrderConnectionSuccess => ({
  type: WS_USER_CONNECTION_SUCCESS
});

export const wsUserOrderConnectionClosed = (): IWsUserOrderConnectionClosed => ({
  type: WS_USER_CONNECTION_CLOSED
});

export const wsUserOrderConnectionError = (): IWsUserOrderConnectionError => ({
  type: WS_USER_CONNECTION_ERROR
});

export const wsUserOrderGetMessage = (orders: IOrder): IWsUserOrderGetMessage => ({
  type: WS_USER_GET_MESSAGE,
  payload: orders
});

export const orderSetCurrentIngredient = (currentOrder: IOrderItem): IOrderSetCurrentIngredient => ({
  type: ORDER_SET_CURRENT_ORDER,
  currentOrder: currentOrder
});

export const orderDeleteCurrentIngredient = (): IOrderDeleteCurrentIngredient => ({
  type: ORDER_DELETE_CURRENT_ORDER
});