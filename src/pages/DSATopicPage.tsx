import React from "react";
import CategoryHero from "../components/CategoryHero";
import ResourceCard from "../components/ResourceCard";
import { useTheme } from "../context/ThemeContext";
import { dsaTopics } from "../data/topics";
import { dsaResources } from "../data/resources";

interface DSATopicPageProps {
  topicId: string;
}

const DSATopicPage: React.FC<DSATopicPageProps> = ({ topicId }) => {
  const { theme } = useTheme();
  const topic = dsaTopics.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p>Topic not found</p>
      </div>
    );
  }

  const resources = dsaResources.filter(
    (resource) => resource.topicId === topicId
  );

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.subtopic]) {
      acc[resource.subtopic] = [];
    }
    acc[resource.subtopic].push(resource);
    return acc;
  }, {} as Record<string, typeof resources>);

  return (
    <div>
      <CategoryHero topic={topic} />

      {Object.entries(groupedResources).map(([subtopic, subtopicResources]) => (
        <div key={subtopic} className="mb-10">
          <h2
            className={`text-xl font-semibold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {subtopic}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subtopicResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      ))}

      {resources.length === 0 && (
        <div
          className={`
          p-6 rounded-lg text-center ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <p className="text-lg">No resources found for this topic yet.</p>
        </div>
      )}
    </div>
  );
};

export default DSATopicPage;
