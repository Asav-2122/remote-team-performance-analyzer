import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "teams",
        element: <Teams />,
      },
      {
        path: "settings",
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
