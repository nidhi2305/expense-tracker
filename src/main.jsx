import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store/Store";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./App.css"; // Import custom CSS

// Render the root of the React application
// Wrap App with Redux Provider to give access to the Redux store
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <App />
  </Provider>
);
