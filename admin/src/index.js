import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { AuthContextProvider } from "./context/authContext/AuthContext.jsx";
import { MovieContextProvider } from "./context/movieContext/MovieContext.jsx";
import { ListContextProvider } from "./context/listContext/ListContext.jsx";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MovieContextProvider>
        <ListContextProvider>
          <App />
        </ListContextProvider>
      </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);