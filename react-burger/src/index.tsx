import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { store } from "./services/store";
import { BrowserRouter } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";

import reportWebVitals from "./reportWebVitals";

import App from "./components/app/app";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
