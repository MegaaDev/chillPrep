export interface Topic {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  description: string;
  tags: string[];
}

export interface Resource {
  id: string;
  topicId: string;
  subtopic: string;
  title: string;
  description: string;
  url: string;
  author: string;
  type: 'video' | 'article' | 'github' | 'documentation' | 'other';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}