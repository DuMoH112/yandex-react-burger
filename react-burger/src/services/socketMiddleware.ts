import { Middleware, MiddlewareAPI } from "redux";
import { getCookie } from "./cookies";
import { AppDispatch, RootState } from "./types";
import { wsOrdersActions, wsUserOrdersActions } from "./actions/orders";

type TWsActions = typeof wsOrdersActions | typeof wsUserOrdersActions;

export const socketMiddleware = (
  wsUrl: string,
  actions: TWsActions,
  { checkToken }: { checkToken?: boolean }
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    const {
      WS_CONNECTION_START,
      WS_CONNECTION_SUCCESS,
      WS_CONNECTION_CLOSED,
      WS_CONNECTION_ERROR,
      WS_GET_MESSAGE,
    }: TWsActions = actions;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const token = getCookie("accessToken");

      if (type === WS_CONNECTION_START) {
        if (checkToken && token) {
          socket = new WebSocket(`${wsUrl}${"?token=" + token.slice(7)}`);
        } else {
          socket = new WebSocket(`${wsUrl}`);
        }
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS });
        };

        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: WS_GET_MESSAGE, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED });
        };
      }

      next(action);
    };
  };
};
