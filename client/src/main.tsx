// src/index.tsx
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "Dashboard",
        element: <Dashboard />,
      },
      {
        path: "Teams",
        element: <Teams />,
      },
      {
        path: "Settings",
        element: <Settings />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}

// Set initial dark mode based on saved preference
const darkMode = localStorage.getItem("dark-mode") === "true";
document.documentElement.classList.toggle("dark", darkMode);
