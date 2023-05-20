import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { UserProvider } from "./components/localStorage/LocalStorage";
import { Provider } from "react-redux";
import store from "./store";

axios.defaults.baseURL =
  process.env.REACT_APP_API || "http://192.168.18.12:8080/api/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <UserProvider>
            <App />
          </UserProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
