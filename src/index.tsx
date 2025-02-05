import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecipesProvider } from "./modules/recipes/RecipesProvider";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { apptTheme as appTheme } from "./styles/theme";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={appTheme}>
        <BrowserRouter>
          <RecipesProvider initialState={[]}>
            <App />
          </RecipesProvider>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
