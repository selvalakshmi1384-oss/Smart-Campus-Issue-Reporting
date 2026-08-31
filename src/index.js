import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { IssueProvider } from "./context/IssueContext";
import { UserProvider } from "./context/UserContext"; // ✅ Add this

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <IssueProvider>
          <App />
        </IssueProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);