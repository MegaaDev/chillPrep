import React from "react";
import { NavLink } from "react-router-dom";
import {
  X,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileStackIcon as CircleStackIcon,
  Code,
  Layers,
  Database,
  Network,
  Server,
  CheckCircle,
  GitGraph,
} from "lucide-react";
import { dsaTopics, nonDsaTopics, advancedTopics } from "../data/topics";
import { useTheme } from "../context/ThemeContext";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { theme } = useTheme();
  const [completedTopics, setCompletedTopics] = React.useState<string[]>(() => {
    const saved = localStorage.getItem("completedTopics");
    return saved ? JSON.parse(saved) : [];
  });

  const [openSections, setOpenSections] = React.useState<
    Record<string, boolean>
  >({
    timeline: false,
    dsa: false,
    nonDsa: false,
    advanced: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleCompletion = (topicId: string) => {
    setCompletedTopics((prev) => {
      const newCompleted = prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId];

      localStorage.setItem("completedTopics", JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const getLucideIcon = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code size={18} />;
      case "layers":
        return <Layers size={18} />;
      case "database":
        return <Database size={18} />;
      case "network":
        return <Network size={18} />;
      case "server":
        return <Server size={18} />;
      default:
        return <CircleStackIcon size={18} />;
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-30 h-screen w-64 pt-4 overflow-y-auto ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
          } shadow-lg transition-all duration-300 ease-in-out
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:sticky lg:top-0
        `}
      >
        <div className="px-4 flex justify-between items-center mb-6 sticky top-0 bg-inherit z-10">
          <h2 className="text-lg font-bold">Resources</h2>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-2 space-y-6 pb-24">
          <div>
            <div
              className="flex justify-between items-center px-4 cursor-pointer"
              onClick={() => toggleSection("timeline")}
            >
              <h3
                className={`text-xs uppercase font-semibold ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Megaaa HUB
              </h3>
              {openSections.timeline ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
            {openSections.timeline && (
              <ul className="space-y-1 mt-2">
                {[
                  { id: "timeline", title: "Timeline", path: "/roadmap" },
                  { id: "faqs", title: "FAQs", path: "/faqs" },
                  {
                    id: "interview-companion",
                    title: "Interview Companion",
                    path: "/interview-companion",
                  },
                ].map((item) => (
                  <li key={item.id}>
                    <div className="flex items-center">
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => `
                          flex items-center flex-1 px-4 py-2 text-sm rounded-lg
                          ${
                            isActive
                              ? theme === "dark"
                                ? "bg-blue-900 bg-opacity-30 text-blue-400"
                                : "bg-blue-100 text-blue-800"
                              : "hover:bg-gray-700 hover:bg-opacity-20"
                          }
                        `}
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            toggleSidebar();
                          }
                        }}
                      >
                        <span>{item.title}</span>
                        <ChevronRight size={16} className="ml-auto" />
                      </NavLink>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* DSA Topics */}
          <div>
            <div
              className="flex justify-between items-center px-4 cursor-pointer"
              onClick={() => toggleSection("dsa")}
            >
              <h3
                className={`text-xs uppercase font-semibold ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                DSA Topics
              </h3>
              {openSections.dsa ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
            {openSections.dsa && (
              <ul className="space-y-1 mt-2">
                {dsaTopics.map((topic) => (
                  <li key={topic.id}>
                    <div className="flex items-center">
                      <NavLink
                        to={`/dsa/${topic.id}`}
                        className={({ isActive }) => `
                          flex items-center flex-1 px-4 py-2 text-sm rounded-lg
                          ${
                            isActive
                              ? theme === "dark"
                                ? "bg-blue-900 bg-opacity-30 text-blue-400"
                                : "bg-blue-100 text-blue-800"
                              : "hover:bg-gray-700 hover:bg-opacity-20"
                          }
                        `}
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            toggleSidebar();
                          }
                        }}
                      >
                        <span className="mr-2">
                          {getLucideIcon(topic.icon)}
                        </span>
                        <span>{topic.title}</span>
                        <ChevronRight size={16} className="ml-auto" />
                      </NavLink>
                      <button
                        onClick={() => toggleCompletion(topic.id)}
                        className={`p-2 rounded-full ml-1 ${
                          completedTopics.includes(topic.id)
                            ? theme === "dark"
                              ? "text-green-400"
                              : "text-green-600"
                            : theme === "dark"
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        <CheckCircle size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Non-DSA Topics */}
          <div>
            <div
              className="flex justify-between items-center px-4 cursor-pointer"
              onClick={() => toggleSection("nonDsa")}
            >
              <h3
                className={`text-xs uppercase font-semibold ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Non-DSA Topics
              </h3>
              {openSections.nonDsa ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
            {openSections.nonDsa && (
              <ul className="space-y-1 mt-2">
                {nonDsaTopics.map((topic) => (
                  <li key={topic.id}>
                    <div className="flex items-center">
                      <NavLink
                        to={`/non-dsa/${topic.id}`}
                        className={({ isActive }) => `
                          flex items-center flex-1 px-4 py-2 text-sm rounded-lg
                          ${
                            isActive
                              ? theme === "dark"
                                ? "bg-blue-900 bg-opacity-30 text-blue-400"
                                : "bg-blue-100 text-blue-800"
                              : "hover:bg-gray-700 hover:bg-opacity-20"
                          }
                        `}
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            toggleSidebar();
                          }
                        }}
                      >
                        <span className="mr-2">
                          {getLucideIcon(topic.icon)}
                        </span>
                        <span>{topic.title}</span>
                        <ChevronRight size={16} className="ml-auto" />
                      </NavLink>
                      <button
                        onClick={() => toggleCompletion(topic.id)}
                        className={`p-2 rounded-full ml-1 ${
                          completedTopics.includes(topic.id)
                            ? theme === "dark"
                              ? "text-green-400"
                              : "text-green-600"
                            : theme === "dark"
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        <CheckCircle size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Advanced CP Topics */}
          <div>
            <div
              className="flex justify-between items-center px-4 cursor-pointer"
              onClick={() => toggleSection("advanced")}
            >
              <h3
                className={`text-xs uppercase font-semibold ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Advanced CP
              </h3>
              {openSections.advanced ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
            {openSections.advanced && (
              <ul className="space-y-1 mt-2">
                {advancedTopics.map((topic) => (
                  <li key={topic.id}>
                    <div className="flex items-center">
                      <NavLink
                        to={`/advanced/${topic.id}`}
                        className={({ isActive }) => `
                          flex items-center flex-1 px-4 py-2 text-sm rounded-lg
                          ${
                            isActive
                              ? theme === "dark"
                                ? "bg-purple-900 bg-opacity-30 text-purple-400"
                                : "bg-purple-100 text-purple-800"
                              : "hover:bg-gray-700 hover:bg-opacity-20"
                          }
                        `}
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            toggleSidebar();
                          }
                        }}
                      >
                        <span className="mr-2">
                          {getLucideIcon(topic.icon)}
                        </span>
                        <span>{topic.title}</span>
                        <ChevronRight size={16} className="ml-auto" />
                      </NavLink>
                      <button
                        onClick={() => toggleCompletion(topic.id)}
                        className={`p-2 rounded-full ml-1 ${
                          completedTopics.includes(topic.id)
                            ? theme === "dark"
                              ? "text-green-400"
                              : "text-green-600"
                            : theme === "dark"
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        <CheckCircle size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
