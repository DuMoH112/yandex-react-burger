import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers/index";
import thunk from "redux-thunk";

import { socketMiddleware } from "./socketMiddleware";
import { WS_URL, WS_USER_URL } from "../config/path";
import { wsOrdersActions, wsUserOrdersActions } from "./actions/orders";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(WS_URL, wsOrdersActions, { checkToken: false }),
    socketMiddleware(WS_USER_URL, wsUserOrdersActions, { checkToken: true })
  )
);

export const store = createStore(rootReducer, enhancer);
