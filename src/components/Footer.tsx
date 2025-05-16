import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Github, Linkedin, Heart } from "lucide-react";

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`py-6 px-4 ${
        theme === "dark"
          ? "bg-gray-800 text-gray-300 border-t border-gray-700"
          : "bg-white text-gray-600 border-t border-gray-200"
      } transition-colors duration-300`}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent inline-flex items-center">
              ChillPrep{" "}
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                for Famr
              </span>
            </h2>
            <p className="text-sm mt-1">
              Your one-stop shop for software internship preparation
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/MegaaDev"
              target="_blank"
              className={`
                p-2 rounded-full ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } transition-colors duration-200
              `}
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/akshay-the-megaa/"
              target="_blank"
              className={`
                p-2 rounded-full ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } transition-colors duration-200
              `}
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm">
          <p className="flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> for Famr
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} ChillPrep by{" "}
            <a
              href="https://www.linkedin.com/in/akshay-the-megaa/"
              className="font-bold text-[#dedede]"
            >
              Megaaa
            </a>
            . All rights not reserved haha.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
