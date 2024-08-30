// src/components/Header.tsx
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="bg-primary-dark text-white dark:bg-primary-light dark:text-text-dark p-4">
      <h1 className="text-2xl font-bold">Remote Team Performance Analyzer</h1>
      <Navbar />
    </header>
  );
}

export default Header;
