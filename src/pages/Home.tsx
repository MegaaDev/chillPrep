import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  BookOpen,
  Code,
  Database,
  Server,
  Network,
  Layers,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { dsaTopics, nonDsaTopics } from "../data/topics";

const Home: React.FC = () => {
  const { theme } = useTheme();

  const getLucideIcon = (iconName: string, size = 24) => {
    switch (iconName) {
      case "code":
        return <Code size={size} />;
      case "layers":
        return <Layers size={size} />;
      case "database":
        return <Database size={size} />;
      case "network":
        return <Network size={size} />;
      case "server":
        return <Server size={size} />;
      default:
        return <BookOpen size={size} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section
        className={`
        rounded-2xl p-8 mb-10 ${
          theme === "dark"
            ? "bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"
            : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        }
      `}
      >
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              ChillPrep
            </span>{" "}
            <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
              Your One-Stop Resource for Software Internship Prep
            </span>
          </h1>
          <p
            className={`text-lg mb-6 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Curated resources for DSA, system design, and core CS subjects to
            help you ace your software interviews (For now internships).
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/dsa/arrays"
              className={`
                inline-flex items-center px-5 py-3 rounded-lg font-medium
                ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } transition-colors duration-200
              `}
            >
              Explore DSA Resources
              <ChevronRight size={18} className="ml-1" />
            </Link>
            <Link
              to="/roadmap"
              className={`
                inline-flex items-center px-5 py-3 rounded-lg font-medium
                ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-900 border border-gray-300"
                } transition-colors duration-200
              `}
            >
              Explore Roadmap and boost your prep
              <ChevronRight size={18} className="ml-1" />
            </Link>
            <Link
              to="/faq"
              className={`
              inline-flex items-center px-5 py-3 rounded-lg font-medium
              ${
                theme === "dark"
                  ? "bg-white hover:bg-gray-100 text-gray-900 border border-gray-300"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              } transition-colors duration-200
              `}
            >
              FAQs
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">DSA Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dsaTopics.map((topic) => (
            <Link
              key={topic.id}
              to={`/dsa/${topic.id}`}
              className={`
                p-6 rounded-xl flex items-start ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-750 border border-gray-700"
                    : "bg-white hover:bg-gray-50 border border-gray-200"
                } transition-all duration-200 hover:shadow-lg
              `}
            >
              <div
                className={`
                p-3 rounded-lg mr-4 ${
                  theme === "dark" ? "bg-blue-900 bg-opacity-30" : "bg-blue-100"
                } text-blue-500
              `}
              >
                {getLucideIcon(topic.icon)}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{topic.title}</h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  } line-clamp-2`}
                >
                  {topic.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Non-DSA Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nonDsaTopics.map((topic) => (
            <Link
              key={topic.id}
              to={`/non-dsa/${topic.id}`}
              className={`
                p-6 rounded-xl flex items-start ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-750 border border-gray-700"
                    : "bg-white hover:bg-gray-50 border border-gray-200"
                } transition-all duration-200 hover:shadow-lg
              `}
            >
              <div
                className={`
                p-3 rounded-lg mr-4 ${
                  theme === "dark"
                    ? "bg-indigo-900 bg-opacity-30"
                    : "bg-indigo-100"
                } text-indigo-500
              `}
              >
                {getLucideIcon(topic.icon)}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{topic.title}</h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  } line-clamp-2`}
                >
                  {topic.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
