import React from 'react';
import { ExternalLink, BookOpen, Youtube, FileText, Github, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const { theme } = useTheme();
  const [completed, setCompleted] = React.useState(() => {
    const saved = localStorage.getItem(`resource-${resource.id}`);
    return saved === 'true';
  });
  
  const getResourceIcon = () => {
    switch (resource.type) {
      case 'video': return <Youtube size={18} className="text-red-500" />;
      case 'article': return <FileText size={18} className="text-blue-500" />;
      case 'github': return <Github size={18} className="text-purple-500" />;
      case 'documentation': return <BookOpen size={18} className="text-green-500" />;
      default: return <ExternalLink size={18} className="text-gray-500" />;
    }
  };

  const getBadgeColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'medium': return theme === 'dark' ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'hard': return theme === 'dark' ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      default: return theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const toggleCompleted = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    localStorage.setItem(`resource-${resource.id}`, String(newCompleted));
  };

  return (
    <div className={`
      rounded-lg p-4 ${theme === 'dark' 
        ? 'bg-gray-800 hover:bg-gray-750' 
        : 'bg-white hover:bg-gray-50'
      } shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
      transition-all duration-200 hover:shadow-md
    `}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg mr-3 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            {getResourceIcon()}
          </div>
          <div>
            <h3 className="font-medium text-sm md:text-base">
              {resource.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {resource.author}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(resource.difficulty)}`}>
            {resource.difficulty}
          </span>
          <button
            onClick={toggleCompleted}
            className={`p-1.5 rounded-full transition-colors duration-200 ${
              completed
                ? theme === 'dark'
                  ? 'text-green-400 hover:bg-green-900 hover:bg-opacity-30'
                  : 'text-green-600 hover:bg-green-100'
                : theme === 'dark'
                  ? 'text-gray-500 hover:bg-gray-700'
                  : 'text-gray-400 hover:bg-gray-100'
            }`}
            title={completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <CheckCircle size={18} />
          </button>
        </div>
      </div>
      
      <p className={`mt-3 text-sm ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      } line-clamp-2`}>
        {resource.description}
      </p>
      
      <div className="mt-4 flex justify-end">
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`
            inline-flex items-center text-xs font-medium rounded-lg px-3 py-1.5
            ${theme === 'dark'
              ? 'bg-blue-900 bg-opacity-50 text-blue-300 hover:bg-opacity-70'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }
            transition-colors duration-200
          `}
        >
          View Resource
          <ExternalLink size={12} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;