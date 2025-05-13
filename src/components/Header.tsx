import React from "react";
import { Link } from "react-router-dom";
import { Menu, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`
      sticky top-0 z-10 p-4 ${
        theme === "dark"
          ? "bg-gray-800 text-white border-b border-gray-700"
          : "bg-white text-gray-900 border-b border-gray-200"
      } shadow-sm transition-colors duration-300
    `}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              ChillPrep
            </h1>
            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
              by Famr
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
            } transition-colors duration-200`}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
