import React, { useState, useEffect } from "react";
import {
  Check,
  AlertTriangle,
  BookOpen,
  Code,
  RotateCcw,
  Settings,
  ArrowLeft,
  Youtube,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { generatePlans } from "../data/plans";
import { VERSION, GOOGLE_SHEET_RESOURCES } from "../config/config";
const CURRENT_VERSION = VERSION;
const GOOGLE_SHEET_URL = GOOGLE_SHEET_RESOURCES; // Updated URL format for CSV

declare global {
  interface MicroTopic {
    id: string;
    name: string;
    completed: boolean;
    markedForRevision: boolean;
    topicId: string;
    topicType: "DSA" | "NonDSA";
    videoLink?: string; // Updated: Video link
    articleLink?: string; // Updated: Article link
  }

  interface Topic {
    id: string;
    name: string;
    type: "DSA" | "NonDSA";
    microTopics: MicroTopic[];
  }

  interface WeekPlan {
    week: number;
    topics: Topic[];
  }

  interface Plan {
    id: string;
    name: string;
    duration: string;
    description: string;
    weeks: WeekPlan[];
    version?: string; // Version tracking for updates
  }
}

const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentPlan: string;
  newPlan: string;
}> = ({ isOpen, onClose, onConfirm, currentPlan, newPlan }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center text-yellow-500 mb-4">
          <AlertTriangle size={24} className="mr-2" />
          <h3 className="text-xl font-semibold">Change Your Learning Path?</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You're about to switch from{" "}
          <span className="font-semibold">{currentPlan}</span> to{" "}
          <span className="font-semibold">{newPlan}</span>.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 p-4 rounded-md mb-6">
          <p className="text-blue-800 dark:text-blue-200 text-sm mb-2">
            <strong>Consistency is key to success!</strong>
          </p>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Sticking with your chosen plan helps build momentum and leads to
            better results. Your progress on your current plan will be saved,
            but changing plans frequently may impact your learning journey.
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center"
          >
            <ArrowLeft size={16} className="mr-1" /> Stay with {currentPlan}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
          >
            <Check size={16} className="mr-1" /> Switch to {newPlan}
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateNotificationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  oldVersion: string;
  newVersion: string;
}> = ({ isOpen, onClose, oldVersion, newVersion }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center text-green-500 mb-4">
          <Check size={24} className="mr-2" />
          <h3 className="text-xl font-semibold">Roadmap Updated</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Your ChillPrep roadmap has been updated from version{" "}
          <strong>{oldVersion}</strong> to <strong>{newVersion}</strong>.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 p-4 rounded-md mb-6">
          <p className="text-blue-800 dark:text-blue-200 text-sm mb-2">
            <strong>Good news!</strong>
          </p>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Your progress has been preserved while adding new content. You might
            see new topics or resources that weren't available before.
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
          >
            <Check size={16} className="mr-1" /> Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const RoadmapApp: React.FC = () => {
  const { theme } = useTheme();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState<boolean>(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [pendingPlanId, setPendingPlanId] = useState<string>("");
  const [showPlanSelection, setShowPlanSelection] = useState<boolean>(true);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showUpdateNotification, setShowUpdateNotification] =
    useState<boolean>(false);
  const [updateVersions, setUpdateVersions] = useState({ old: "", new: "" });
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(
    {}
  );
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const debugLocalStorage = () => {
    try {
      const savedPlans = localStorage.getItem("internship-roadmap-plans");
      console.log(
        "Current localStorage plans:",
        savedPlans ? JSON.parse(savedPlans) : null
      );
    } catch (e) {
      console.error("Failed to parse localStorage plans for debug", e);
    }
  };

  const saveAllPlansToLocalStorage = (plansList: Plan[]) => {
    try {
      // Make sure all plans have current version
      const plansWithVersion = plansList.map((plan) => ({
        ...plan,
        version: CURRENT_VERSION,
      }));

      const plansJson = JSON.stringify(plansWithVersion);
      localStorage.setItem("internship-roadmap-plans", plansJson);
      console.log(
        "Successfully saved all plans to localStorage with version",
        CURRENT_VERSION
      );
    } catch (e) {
      console.error("Failed to save plans to localStorage:", e);
    }
  };

  // Function to merge old plans with new plans, preserving progress
  const mergePlans = (oldPlans: Plan[], newPlans: Plan[]): Plan[] => {
    console.log("Merging plans from old version to new version");

    return newPlans.map((newPlan) => {
      // Find corresponding old plan
      const oldPlan = oldPlans.find((p) => p.id === newPlan.id);
      if (!oldPlan) {
        console.log(`Plan ${newPlan.id} is entirely new`);
        return newPlan; // If the plan is entirely new, use it as is
      }

      // Create a deep copy of the new plan that we'll modify
      const mergedPlan = JSON.parse(JSON.stringify(newPlan));
      console.log(`Merging plan: ${mergedPlan.id}`);

      // For each week in the new plan
      mergedPlan.weeks.forEach((newWeek: WeekPlan, weekIndex: number) => {
        console.log(`Processing week ${newWeek.week}`);

        // Find corresponding old week (by week number)
        const oldWeek = oldPlan.weeks.find((w) => w.week === newWeek.week);
        if (!oldWeek) {
          console.log(`Week ${newWeek.week} is new`);
          return; // If the week is new, keep it as is
        }

        // For each topic in the new week
        newWeek.topics.forEach((newTopic: Topic, topicIndex: number) => {
          console.log(`Processing topic ${newTopic.id}`);

          // Find corresponding old topic
          const oldTopic = oldWeek.topics.find((t) => t.id === newTopic.id);
          if (!oldTopic) {
            console.log(`Topic ${newTopic.id} is new`);
            return; // If the topic is new, keep it as is
          }

          // Log microtopic counts for debugging
          console.log(
            `Topic ${newTopic.id} - Old microtopics: ${oldTopic.microTopics.length}, New microtopics: ${newTopic.microTopics.length}`
          );

          // For each microtopic in the new topic, try to find a match in the old topic
          newTopic.microTopics.forEach(
            (newMicroTopic: MicroTopic, microIndex: number) => {
              // Find corresponding old microtopic by name (most reliable way)
              const oldMicroTopic = oldTopic.microTopics.find(
                (mt) => mt.name === newMicroTopic.name
              );

              if (oldMicroTopic) {
                // If the microtopic exists in old version, copy progress
                console.log(
                  `Found match for microtopic: ${newMicroTopic.name}`
                );
                newMicroTopic.completed = oldMicroTopic.completed;
                newMicroTopic.markedForRevision =
                  oldMicroTopic.markedForRevision;
              } else {
                console.log(`New microtopic added: ${newMicroTopic.name}`);
                // New microtopic - already has default values
                // (completed: false, markedForRevision: false)
              }
            }
          );
        });
      });

      return mergedPlan;
    });
  };

  const WelcomeMessage: React.FC = () => {
    if (!isNewUser) return null;

    return (
      <div
        className={`mb-8 p-6 rounded-lg shadow-md ${
          theme === "dark" ? "bg-indigo-900 bg-opacity-20" : "bg-indigo-50"
        }`}
      >
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
          Welcome to ChillPrep Roadmap!
        </h2>
        <p
          className={`text-lg mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Choose the preparation plan that best fits your timeline and goals:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
            <strong>4-Week Plan:</strong> Intensive preparation for quick
            revision
          </li>
          <li className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
            <strong>6-Week Plan:</strong> Balanced preparation at a moderate
            pace
          </li>
          <li className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
            <strong>8-Week Plan:</strong> Comprehensive preparation with
            in-depth coverage
          </li>
        </ul>
        <div
          className={`p-4 rounded-md ${
            theme === "dark" ? "bg-blue-900 bg-opacity-30" : "bg-blue-50"
          } mb-2`}
        >
          <p
            className={`text-sm ${
              theme === "dark" ? "text-blue-300" : "text-blue-700"
            }`}
          >
            <strong>Tip:</strong> Consistency is more important than speed.
            Choose a plan you can realistically stick with throughout its
            duration.
          </p>
        </div>
      </div>
    );
  };

  // Load plans from Google Sheets
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setError(null);
        setPlansLoading(true);

        // Check for saved plans and handle version differences
        const savedPlans = localStorage.getItem("internship-roadmap-plans");

        if (savedPlans) {
          try {
            const parsedPlans = JSON.parse(savedPlans) as Plan[];
            console.log("Found saved plans in localStorage:", parsedPlans);

            // Check version of the first plan (all should have same version)
            const oldVersion = parsedPlans[0]?.version || "0.0";

            if (oldVersion !== CURRENT_VERSION) {
              console.log(
                `Version mismatch: ${oldVersion} (saved) vs ${CURRENT_VERSION} (current)`
              );

              // Get fresh plans with new structure from Google Sheets
              const newPlans = await generatePlans(GOOGLE_SHEET_URL);

              // Merge old progress with new structure
              const mergedPlans = mergePlans(parsedPlans, newPlans);

              // Update version of merged plans to current
              mergedPlans.forEach((plan) => {
                plan.version = CURRENT_VERSION;
              });

              // Save the merged plans
              setPlans(mergedPlans);
              saveAllPlansToLocalStorage(mergedPlans);

              // Show update notification
              setUpdateVersions({ old: oldVersion, new: CURRENT_VERSION });
              setShowUpdateNotification(true);

              console.log(
                "Plan update complete - all progress has been merged"
              );
            } else {
              // If versions match, use the saved plans as is
              console.log("Version matches - using saved plans");
              setPlans(parsedPlans);
            }
          } catch (e) {
            console.error("Failed to parse saved plans", e);
            const defaultPlans = await generatePlans(GOOGLE_SHEET_URL);
            setPlans(defaultPlans);
            saveAllPlansToLocalStorage(defaultPlans);
          }
        } else {
          console.log(
            "No saved plans found, initializing with defaults from Google Sheets"
          );
          const defaultPlans = await generatePlans(GOOGLE_SHEET_URL);
          setPlans(defaultPlans);
          saveAllPlansToLocalStorage(defaultPlans);
        }

        setPlansLoading(false);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setError(
          "Failed to load plans. Please check your internet connection and try again."
        );
        setPlansLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Load user preferences
  useEffect(() => {
    const savedPlanId = localStorage.getItem(
      "internship-roadmap-selected-plan"
    );
    if (savedPlanId) {
      console.log("Found saved plan selection:", savedPlanId);
      setSelectedPlanId(savedPlanId);
      setShowPlanSelection(false);
      setIsNewUser(false);
    } else {
      console.log("No saved plan selection, showing plan selection screen");
      setShowPlanSelection(true);
      setIsNewUser(true);
    }

    const savedExpandedTopics = localStorage.getItem(
      "internship-roadmap-expanded-topics"
    );
    if (savedExpandedTopics) {
      try {
        const parsedExpandedTopics = JSON.parse(savedExpandedTopics);
        console.log("Found saved expanded topics:", parsedExpandedTopics);
        setExpandedTopics(parsedExpandedTopics);
      } catch (e) {
        console.error("Failed to parse expanded topics", e);
        setExpandedTopics({});
        localStorage.setItem("internship-roadmap-expanded-topics", "{}");
      }
    }
  }, []);

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  const handlePlanSelection = (planId: string) => {
    console.log("Plan selection requested:", planId);

    if (isNewUser) {
      console.log("New user selecting initial plan");
      setSelectedPlanId(planId);
      setShowPlanSelection(false);
      setIsNewUser(false);

      try {
        localStorage.setItem("internship-roadmap-selected-plan", planId);
        console.log("Saved initial plan selection to localStorage");
      } catch (e) {
        console.error("Failed to save plan selection to localStorage:", e);
      }
    } else if (selectedPlanId && selectedPlanId !== planId) {
      console.log("Existing user changing plan - showing confirmation");
      setPendingPlanId(planId);
      setShowConfirmation(true);
    } else {
      setSelectedPlanId(planId);
      setShowPlanSelection(false);

      try {
        localStorage.setItem("internship-roadmap-selected-plan", planId);
        console.log("Saved plan selection to localStorage");
      } catch (e) {
        console.error("Failed to save plan selection to localStorage:", e);
      }
    }
  };

  const confirmPlanChange = () => {
    console.log("Plan change confirmed to:", pendingPlanId);
    setSelectedPlanId(pendingPlanId);
    setShowPlanSelection(false);
    setShowConfirmation(false);

    try {
      localStorage.setItem("internship-roadmap-selected-plan", pendingPlanId);
      console.log(
        "Saved new plan selection to localStorage after confirmation"
      );
    } catch (e) {
      console.error("Failed to save plan selection to localStorage:", e);
    }
  };

  const toggleMicroTopicCompletion = (
    weekIndex: number,
    topicIndex: number,
    microTopicIndex: number
  ) => {
    if (!selectedPlan) return;
    console.log(
      `Toggling completion for microtopic at week:${weekIndex}, topic:${topicIndex}, micro:${microTopicIndex}`
    );

    const newPlans = JSON.parse(JSON.stringify(plans));

    const planIndex = newPlans.findIndex(
      (p: { id: string }) => p.id === selectedPlanId
    );
    if (planIndex === -1) {
      console.error("Selected plan not found in plans array");
      return;
    }

    try {
      const microTopic =
        newPlans[planIndex].weeks[weekIndex].topics[topicIndex].microTopics[
          microTopicIndex
        ];

      microTopic.completed = !microTopic.completed;
      console.log(`Toggled completion to: ${microTopic.completed}`);

      setPlans(newPlans);

      saveAllPlansToLocalStorage(newPlans);

      debugLocalStorage();
    } catch (e) {
      console.error("Error toggling microtopic completion:", e);
    }
  };

  const toggleMicroTopicRevision = (
    weekIndex: number,
    topicIndex: number,
    microTopicIndex: number
  ) => {
    if (!selectedPlan) return;
    console.log(
      `Toggling revision for microtopic at week:${weekIndex}, topic:${topicIndex}, micro:${microTopicIndex}`
    );

    const newPlans = JSON.parse(JSON.stringify(plans));

    const planIndex = newPlans.findIndex(
      (p: { id: string }) => p.id === selectedPlanId
    );
    if (planIndex === -1) {
      console.error("Selected plan not found in plans array");
      return;
    }

    try {
      const microTopic =
        newPlans[planIndex].weeks[weekIndex].topics[topicIndex].microTopics[
          microTopicIndex
        ];

      microTopic.markedForRevision = !microTopic.markedForRevision;
      console.log(
        `Toggled revision status to: ${microTopic.markedForRevision}`
      );
      setPlans(newPlans);

      saveAllPlansToLocalStorage(newPlans);

      debugLocalStorage();
    } catch (e) {
      console.error("Error toggling microtopic revision status:", e);
    }
  };

  const toggleTopicExpansion = (topicId: string) => {
    console.log(`Toggling expansion for topic: ${topicId}`);

    const newExpandedTopics = {
      ...expandedTopics,
      [topicId]: !expandedTopics[topicId],
    };

    setExpandedTopics(newExpandedTopics);

    try {
      localStorage.setItem(
        "internship-roadmap-expanded-topics",
        JSON.stringify(newExpandedTopics)
      );
      console.log("Saved expanded topics to localStorage");
    } catch (e) {
      console.error("Failed to save expanded topics to localStorage:", e);
    }
  };

  const calculateProgress = (week: WeekPlan) => {
    let total = 0;
    let completed = 0;

    week.topics.forEach((topic) => {
      topic.microTopics.forEach((microTopic) => {
        total++;
        if (microTopic.completed) {
          completed++;
        }
      });
    });

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const calculateTotalProgress = () => {
    if (!selectedPlan) return 0;

    let total = 0;
    let completed = 0;

    selectedPlan.weeks.forEach((week) => {
      week.topics.forEach((topic) => {
        topic.microTopics.forEach((microTopic) => {
          total++;
          if (microTopic.completed) {
            completed++;
          }
        });
      });
    });

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  // Updated function to get resource links
  const getResourceLinks = (microTopic: MicroTopic) => {
    return {
      // Only return non-empty strings as valid links
      videoLink:
        microTopic.videoLink && microTopic.videoLink.trim()
          ? microTopic.videoLink
          : null,
      articleLink:
        microTopic.articleLink && microTopic.articleLink.trim()
          ? microTopic.articleLink
          : null,
      defaultLink:
        (!microTopic.videoLink || !microTopic.videoLink.trim()) &&
        (!microTopic.articleLink || !microTopic.articleLink.trim())
          ? `/${microTopic.topicType === "DSA" ? "dsa" : "non-dsa"}/${
              microTopic.topicId
            }`
          : null,
    };
  };

  // Show loading state
  if (plansLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading your roadmap...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="text-center max-w-md p-6 rounded-lg shadow-md bg-red-50 dark:bg-red-900 dark:bg-opacity-20">
          <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
            Error Loading Roadmap
          </h2>
          <p className="mb-4 text-gray-800 dark:text-gray-200">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } transition-colors duration-200`}
    >
      <div
        className={`rounded-xl
            py-6 ${
              theme === "dark"
                ? "bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"
                : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
            }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                ChillPrep
              </span>{" "}
              <span>Internship Roadmap</span>
            </h1>
            <p
              className={`text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Structured preparation plans for software engineering internships
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {selectedPlanId && !showPlanSelection && (
              <button
                onClick={() => setShowPlanSelection(true)}
                className={`px-4 py-2 rounded-md flex items-center ${
                  theme === "dark"
                    ? "bg-indigo-800 hover:bg-indigo-700 text-white"
                    : "bg-indigo-100 hover:bg-indigo-200 text-indigo-800"
                }`}
              >
                <Settings size={16} className="mr-1" /> Change Plan
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {showPlanSelection ? (
          <div
            className={`mb-8 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-md`}
          >
            {selectedPlanId && !isNewUser && (
              <button
                onClick={() => setShowPlanSelection(false)}
                className={`mb-4 flex items-center ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                } hover:underline`}
              >
                <ArrowLeft size={16} className="mr-1" /> Back to current plan
              </button>
            )}

            <WelcomeMessage />

            <h2 className="text-xl font-semibold mb-6">
              {isNewUser ? "Select Your Preparation Plan" : "Change Your Plan"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => handlePlanSelection(plan.id)}
                  className={`
                    p-6 rounded-xl cursor-pointer transition-all duration-200
                    ${
                      selectedPlanId === plan.id
                        ? theme === "dark"
                          ? "bg-indigo-900 border-2 border-indigo-600 shadow-lg"
                          : "bg-indigo-50 border-2 border-indigo-500 shadow-lg"
                        : theme === "dark"
                        ? "bg-gray-750 hover:bg-gray-700 border border-gray-700"
                        : "bg-white hover:bg-gray-50 border border-gray-200"
                    }
                  `}
                >
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      selectedPlanId === plan.id ? "text-indigo-400" : ""
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Duration: {plan.duration}
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {selectedPlan && !showPlanSelection ? (
          <>
            <div
              className={`mb-8 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } p-6 rounded-lg shadow-md`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-indigo-500 mb-2 md:mb-0">
                  {selectedPlan.name} Progress
                </h2>
                <div className="flex items-center">
                  <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-4 mr-2">
                    <div
                      className="bg-indigo-600 h-4 rounded-full"
                      style={{ width: `${calculateTotalProgress()}%` }}
                    ></div>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {calculateTotalProgress()}% Complete
                  </span>
                </div>
              </div>
            </div>

            {selectedPlan.weeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className={`mb-8 ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } p-6 rounded-lg shadow-md`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-indigo-500 mb-2 md:mb-0">
                    Week {week.week}
                  </h2>
                  <div className="flex items-center">
                    <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-4 mr-2">
                      <div
                        className="bg-indigo-600 h-4 rounded-full"
                        style={{ width: `${calculateProgress(week)}%` }}
                      ></div>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {calculateProgress(week)}% Complete
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* DSA Topics */}
                  <div>
                    <h3
                      className={`text-lg font-medium mb-3 border-b pb-2 ${
                        theme === "dark"
                          ? "text-gray-300 border-gray-700"
                          : "text-gray-700 border-gray-200"
                      }`}
                    >
                      DSA Topics
                    </h3>
                    {week.topics
                      .filter((topic) => topic.type === "DSA")
                      .map((topic) => (
                        <div key={topic.id} className="mb-4">
                          <div
                            className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-opacity-80 ${
                              theme === "dark" ? "bg-gray-750" : "bg-gray-50"
                            }`}
                            onClick={() => toggleTopicExpansion(topic.id)}
                          >
                            <h4 className="font-medium">{topic.name}</h4>
                            <span
                              className={
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }
                            >
                              {expandedTopics[topic.id] ? "▼" : "►"}
                            </span>
                          </div>

                          {expandedTopics[topic.id] && (
                            <div className="ml-4 mt-2 space-y-2">
                              {topic.microTopics.map(
                                (microTopic, microTopicIndex) => (
                                  <div
                                    key={microTopic.id}
                                    className={`flex items-center justify-between p-2 border-b ${
                                      theme === "dark"
                                        ? "border-gray-700"
                                        : "border-gray-100"
                                    }`}
                                  >
                                    <div className="flex items-center flex-1">
                                      <input
                                        type="checkbox"
                                        checked={microTopic.completed}
                                        onChange={() =>
                                          toggleMicroTopicCompletion(
                                            weekIndex,
                                            week.topics.findIndex(
                                              (t) => t.id === topic.id
                                            ),
                                            microTopicIndex
                                          )
                                        }
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                                      />
                                      <span
                                        className={`ml-2 ${
                                          microTopic.completed
                                            ? "line-through text-gray-400 dark:text-gray-500"
                                            : theme === "dark"
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                        }`}
                                      >
                                        {microTopic.name}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      {/* Resource links - updated with new icons */}
                                      {(() => {
                                        const links =
                                          getResourceLinks(microTopic);
                                        return (
                                          <>
                                            {/* Video Link - Now with YouTube icon only */}
                                            {links.videoLink && (
                                              <a
                                                href={links.videoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`px-2 py-1 text-xs rounded ${
                                                  theme === "dark"
                                                    ? "bg-purple-900 text-purple-200 hover:bg-purple-800"
                                                    : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                                }`}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                }}
                                                title="Video"
                                              >
                                                <Youtube size={14} />
                                              </a>
                                            )}

                                            {/* Article Link - Now with Code icon only */}
                                            {links.articleLink && (
                                              <a
                                                href={links.articleLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`px-2 py-1 text-xs rounded ${
                                                  theme === "dark"
                                                    ? "bg-blue-900 text-blue-200 hover:bg-blue-800"
                                                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                                }`}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                }}
                                                title="Article"
                                              >
                                                <Code size={14} />
                                              </a>
                                            )}

                                            {/* Default Link - Still with BookOpen icon only */}
                                            {links.defaultLink && (
                                              <a
                                                href={links.defaultLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`px-2 py-1 text-xs rounded ${
                                                  theme === "dark"
                                                    ? "bg-green-900 text-green-200 hover:bg-green-800"
                                                    : "bg-green-100 text-green-800 hover:bg-green-200"
                                                }`}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                }}
                                                title="Resource"
                                              >
                                                <BookOpen size={14} />
                                              </a>
                                            )}
                                          </>
                                        );
                                      })()}

                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleMicroTopicRevision(
                                            weekIndex,
                                            week.topics.findIndex(
                                              (t) => t.id === topic.id
                                            ),
                                            microTopicIndex
                                          );
                                        }}
                                        className={`px-2 py-1 text-xs rounded ${
                                          microTopic.markedForRevision
                                            ? theme === "dark"
                                              ? "bg-yellow-900 text-yellow-200"
                                              : "bg-yellow-200 text-yellow-800"
                                            : theme === "dark"
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                        }`}
                                      >
                                        {microTopic.markedForRevision
                                          ? "Review ★"
                                          : "Mark for Review"}
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>

                  <div>
                    <h3
                      className={`text-lg font-medium mb-3 border-b pb-2 ${
                        theme === "dark"
                          ? "text-gray-300 border-gray-700"
                          : "text-gray-700 border-gray-200"
                      }`}
                    >
                      Non-DSA Topics
                    </h3>
                    {week.topics
                      .filter((topic) => topic.type === "NonDSA")
                      .map((topic) => (
                        <div key={topic.id} className="mb-4">
                          <div
                            className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-opacity-80 ${
                              theme === "dark" ? "bg-gray-750" : "bg-gray-50"
                            }`}
                            onClick={() => toggleTopicExpansion(topic.id)}
                          >
                            <h4 className="font-medium">{topic.name}</h4>
                            <span
                              className={
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }
                            >
                              {expandedTopics[topic.id] ? "▼" : "►"}
                            </span>
                          </div>

                          {expandedTopics[topic.id] && (
                            <div className="ml-4 mt-2 space-y-2">
                              {topic.microTopics.map(
                                (microTopic, microTopicIndex) => (
                                  <div
                                    key={microTopic.id}
                                    className={`flex items-center justify-between p-2 border-b ${
                                      theme === "dark"
                                        ? "border-gray-700"
                                        : "border-gray-100"
                                    }`}
                                  >
                                    <div className="flex items-center flex-1">
                                      <input
                                        type="checkbox"
                                        checked={microTopic.completed}
                                        onChange={() =>
                                          toggleMicroTopicCompletion(
                                            weekIndex,
                                            week.topics.findIndex(
                                              (t) => t.id === topic.id
                                            ),
                                            microTopicIndex
                                          )
                                        }
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                                      />
                                      <span
                                        className={`ml-2 ${
                                          microTopic.completed
                                            ? "line-through text-gray-400 dark:text-gray-500"
                                            : theme === "dark"
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                        }`}
                                      >
                                        {microTopic.name}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      {/* Resource links - updated with new icons */}
                                      {(() => {
                                        const links =
                                          getResourceLinks(microTopic);
                                        return (
                                          <>
                                            {/* Video Link - Now with YouTube icon */}
                                            {links.videoLink && (
                                              <a
                                                href={links.videoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`px-2 py-1 text-xs rounded ${
                                                  theme === "dark"
                                                    ? "bg-purple-900 text-purple-200 hover:bg-purple-800"
                                                    : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                                }`}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                }}
                                              >
                                                <Youtube
                                                  size={12}
                                                  className="inline mr-1"
                                                />
                                                Video
                                              </a>
                                            )}

                                            {/* Article Link - Now with Code icon */}
                                            {links.articleLink && (
                                              <a
                                                href={links.articleLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`px-2 py-1 text-xs rounded ${
                                                  theme === "dark"
                                                    ? "bg-blue-900 text-blue-200 hover:bg-blue-800"
                                                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                                }`}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                }}
                                              >
                                                <Code
                                                  size={12}
                                                  className="inline mr-1"
                                                />
                                                Article
                                              </a>
                                            )}

                                            {/* Default Link - Still with BookOpen icon */}
                                            {links.defaultLink && (
                                              <a
                                                href={links.defaultLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`px-2 py-1 text-xs rounded ${
                                                  theme === "dark"
                                                    ? "bg-green-900 text-green-200 hover:bg-green-800"
                                                    : "bg-green-100 text-green-800 hover:bg-green-200"
                                                }`}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                }}
                                              >
                                                <BookOpen
                                                  size={12}
                                                  className="inline mr-1"
                                                />
                                                Resource
                                              </a>
                                            )}
                                          </>
                                        );
                                      })()}

                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleMicroTopicRevision(
                                            weekIndex,
                                            week.topics.findIndex(
                                              (t) => t.id === topic.id
                                            ),
                                            microTopicIndex
                                          );
                                        }}
                                        className={`px-2 py-1 text-xs rounded ${
                                          microTopic.markedForRevision
                                            ? theme === "dark"
                                              ? "bg-yellow-900 text-yellow-200"
                                              : "bg-yellow-200 text-yellow-800"
                                            : theme === "dark"
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                        }`}
                                      >
                                        {microTopic.markedForRevision
                                          ? "Review ★"
                                          : "Mark for Review"}
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}

            <div
              className={`mt-8 p-6 rounded-lg shadow-md ${
                theme === "dark"
                  ? "bg-yellow-900 bg-opacity-30"
                  : "bg-yellow-50"
              }`}
            >
              <div className="flex items-center mb-4">
                <RotateCcw
                  size={20}
                  className={
                    theme === "dark" ? "text-yellow-400" : "text-yellow-600"
                  }
                />
                <h2
                  className={`text-xl font-semibold ml-2 ${
                    theme === "dark" ? "text-yellow-400" : "text-yellow-800"
                  }`}
                >
                  Topics Marked for Review
                </h2>
              </div>
              <div className="space-y-4">
                {selectedPlan.weeks.flatMap((week) =>
                  week.topics.flatMap((topic) =>
                    topic.microTopics
                      .filter((microTopic) => microTopic.markedForRevision)
                      .map((microTopic) => (
                        <div
                          key={microTopic.id}
                          className={`flex items-center justify-between p-3 rounded-md ${
                            theme === "dark" ? "bg-gray-800" : "bg-white"
                          }`}
                        >
                          <div>
                            <span
                              className={`font-medium ${
                                theme === "dark"
                                  ? "text-yellow-400"
                                  : "text-yellow-800"
                              }`}
                            >
                              {microTopic.name}
                            </span>
                            <span
                              className={`text-sm ml-2 ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              ({topic.name})
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {/* Updated resource links in review section with new icons */}
                            {(() => {
                              const links = getResourceLinks(microTopic);
                              return (
                                <>
                                  {/* Video Link - Now with YouTube icon only */}
                                  {links.videoLink && (
                                    <a
                                      href={links.videoLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`px-3 py-1 text-sm rounded ${
                                        theme === "dark"
                                          ? "bg-purple-900 text-purple-200 hover:bg-purple-800"
                                          : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                      title="Video"
                                    >
                                      <Youtube size={16} />
                                    </a>
                                  )}

                                  {/* Article Link - Now with Code icon only */}
                                  {links.articleLink && (
                                    <a
                                      href={links.articleLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`px-3 py-1 text-sm rounded ${
                                        theme === "dark"
                                          ? "bg-blue-900 text-blue-200 hover:bg-blue-800"
                                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                      title="Article"
                                    >
                                      <Code size={16} />
                                    </a>
                                  )}

                                  {/* Default Link - Still with BookOpen icon only */}
                                  {links.defaultLink && (
                                    <a
                                      href={links.defaultLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`px-3 py-1 text-sm rounded ${
                                        theme === "dark"
                                          ? "bg-green-900 text-green-200 hover:bg-green-800"
                                          : "bg-green-100 text-green-800 hover:bg-green-200"
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                      title="Resource"
                                    >
                                      <BookOpen size={16} />
                                    </a>
                                  )}
                                </>
                              );
                            })()}

                            <button
                              onClick={() => {
                                const weekIndex = selectedPlan.weeks.findIndex(
                                  (w) =>
                                    w.topics.some((t) =>
                                      t.microTopics.some(
                                        (mt) => mt.id === microTopic.id
                                      )
                                    )
                                );
                                if (weekIndex === -1) return;

                                const topicIndex = selectedPlan.weeks[
                                  weekIndex
                                ].topics.findIndex((t) =>
                                  t.microTopics.some(
                                    (mt) => mt.id === microTopic.id
                                  )
                                );
                                if (topicIndex === -1) return;

                                const microTopicIndex = selectedPlan.weeks[
                                  weekIndex
                                ].topics[topicIndex].microTopics.findIndex(
                                  (mt) => mt.id === microTopic.id
                                );
                                if (microTopicIndex === -1) return;

                                toggleMicroTopicRevision(
                                  weekIndex,
                                  topicIndex,
                                  microTopicIndex
                                );
                              }}
                              className={`px-3 py-1 text-sm rounded ${
                                theme === "dark"
                                  ? "bg-yellow-900 text-yellow-200 hover:bg-yellow-800"
                                  : "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
                              }`}
                            >
                              Remove from Review
                            </button>
                          </div>
                        </div>
                      ))
                  )
                )}

                {selectedPlan.weeks.every((week) =>
                  week.topics.every((topic) =>
                    topic.microTopics.every(
                      (microTopic) => !microTopic.markedForRevision
                    )
                  )
                ) && (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No topics marked for review
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          !showPlanSelection && (
            <div
              className={`text-center py-12 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Please select a plan to view the roadmap
            </div>
          )
        )}
      </div>

      {/* Plan Change Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={confirmPlanChange}
        currentPlan={plans.find((p) => p.id === selectedPlanId)?.name || ""}
        newPlan={plans.find((p) => p.id === pendingPlanId)?.name || ""}
      />

      {/* Version Update Notification Modal */}
      <UpdateNotificationModal
        isOpen={showUpdateNotification}
        onClose={() => setShowUpdateNotification(false)}
        oldVersion={updateVersions.old}
        newVersion={updateVersions.new}
      />
    </div>
  );
};

export default RoadmapApp;
