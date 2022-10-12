import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { PropsContextProvider } from "./context/PropsContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PropsContextProvider>
        <App />
      </PropsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
