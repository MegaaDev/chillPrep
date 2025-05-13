import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Topic } from '../types';

interface CategoryHeroProps {
  topic: Topic;
}

const CategoryHero: React.FC<CategoryHeroProps> = ({ topic }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`
      mb-8 p-6 rounded-xl ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-blue-900 to-indigo-900' 
          : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }
    `}>
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        {topic.title}
      </h1>
      <p className={`text-sm md:text-base ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      } max-w-3xl`}>
        {topic.description}
      </p>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {topic.tags.map((tag, index) => (
          <span 
            key={index}
            className={`
              text-xs px-3 py-1 rounded-full ${
                theme === 'dark' 
                  ? 'bg-blue-800 bg-opacity-50 text-blue-200' 
                  : 'bg-blue-100 text-blue-800'
              }
            `}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryHero;