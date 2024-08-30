// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("dark-mode", newDarkMode.toString());
  };

  return (
    <nav className="mt-2 flex items-center justify-between">
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/"
            className="text-blue-300 dark:text-blue-400 hover:underline"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className="text-blue-300 dark:text-blue-400 hover:underline"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/teams"
            className="text-blue-300 dark:text-blue-400 hover:underline"
          >
            Teams
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="text-blue-300 dark:text-blue-400 hover:underline"
          >
            Settings
          </Link>
        </li>
      </ul>
      <button
        onClick={toggleDarkMode}
        className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}

export default Navbar;
