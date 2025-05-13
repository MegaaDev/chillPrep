import { Topic } from '../types';

export const dsaTopics: Topic[] = [
  {
    id: 'arrays',
    title: 'Arrays & Strings',
    icon: 'code',
    shortDescription: 'Learn about arrays, strings, and related algorithms',
    description: 'Master fundamental data structures like arrays and strings, and learn essential algorithms for manipulating them efficiently.',
    tags: ['Arrays', 'Strings', 'Two Pointers', 'Sliding Window']
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    icon: 'layers',
    shortDescription: 'Master singly and doubly linked lists operations',
    description: 'Understand the implementation, advantages, and operations of linked lists, as well as common techniques to solve linked list problems.',
    tags: ['Singly Linked Lists', 'Doubly Linked Lists', 'Fast & Slow Pointers', 'Reversal']
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    icon: 'layers',
    shortDescription: 'Learn LIFO and FIFO data structures',
    description: 'Explore stack and queue implementations, use cases, and problem-solving patterns including monotonic stacks and queue variations.',
    tags: ['Stacks', 'Queues', 'Monotonic Stack', 'Priority Queue']
  },
  {
    id: 'trees',
    title: 'Trees & Binary Trees',
    icon: 'code',
    shortDescription: 'Explore tree traversals and algorithms',
    description: 'Master tree data structures including binary trees, BSTs, and tree traversal algorithms to solve hierarchical problems.',
    tags: ['Binary Trees', 'BST', 'Traversals', 'Tree Algorithms']
  },
  {
    id: 'graphs',
    title: 'Graphs',
    icon: 'network',
    shortDescription: 'Learn graph algorithms and traversals',
    description: 'Understand graph representations, traversal techniques, and algorithms to solve complex problems involving interconnected data.',
    tags: ['BFS', 'DFS', 'Dijkstra', 'Topological Sort']
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    icon: 'code',
    shortDescription: 'Master DP concepts and patterns',
    description: 'Learn how to identify and solve dynamic programming problems using memoization, tabulation, and pattern recognition.',
    tags: ['Memoization', 'Tabulation', '1D DP', '2D DP']
  },
  {
    id: 'sorting-searching',
    title: 'Sorting & Searching',
    icon: 'layers',
    shortDescription: 'Explore algorithms for efficient data organization',
    description: 'Master various sorting algorithms and searching techniques essential for efficient data manipulation and retrieval.',
    tags: ['Binary Search', 'Merge Sort', 'Quick Sort', 'Searching Algorithms']
  },
  {
    id: 'greedy',
    title: 'Greedy Algorithms',
    icon: 'code',
    shortDescription: 'Learn optimal local choice strategies',
    description: 'Understand when and how to apply greedy algorithms to solve optimization problems efficiently.',
    tags: ['Optimization', 'Scheduling', 'Interval Problems', 'Activity Selection']
  },
  {
    id: 'extras',
    title: 'Extra Algorithms',
    icon: 'code',
    shortDescription: 'Important algorithms you might miss',
    description: 'Collection of important algorithms and techniques that are often overlooked but crucial for interviews and competitive programming.',
    tags: ['String Algorithms', 'Bit Manipulation', 'Mathematical Algorithms', 'Advanced Techniques']
  }
];

export const nonDsaTopics: Topic[] = [
  {
    id: 'oops',
    title: 'Object-Oriented Programming',
    icon: 'code',
    shortDescription: 'Master OOP concepts and design principles',
    description: 'Understand the core concepts of object-oriented programming including inheritance, polymorphism, encapsulation, and abstraction.',
    tags: ['Classes', 'Inheritance', 'Polymorphism', 'Design Patterns']
  },
  {
    id: 'system-design',
    title: 'System Design',
    icon: 'server',
    shortDescription: 'Learn how to design scalable systems',
    description: 'Master techniques for designing large-scale distributed systems that are scalable, reliable, and maintainable.',
    tags: ['Scalability', 'Load Balancing', 'Caching', 'Microservices']
  },
  {
    id: 'dbms',
    title: 'Database Management',
    icon: 'database',
    shortDescription: 'Explore SQL, NoSQL, and database concepts',
    description: 'Learn about relational and non-relational databases, normalization, indexing, and query optimization techniques.',
    tags: ['SQL', 'NoSQL', 'Indexing', 'Transactions']
  },
  {
    id: 'os',
    title: 'Operating Systems',
    icon: 'server',
    shortDescription: 'Understand OS concepts and internals',
    description: 'Master key operating system concepts including process management, memory management, file systems, and concurrency.',
    tags: ['Processes', 'Threads', 'Memory Management', 'Synchronization']
  },
  {
    id: 'networking',
    title: 'Computer Networks',
    icon: 'network',
    shortDescription: 'Learn protocols and networking fundamentals',
    description: 'Understand networking protocols, architectures, and concepts essential for distributed systems and internet applications.',
    tags: ['TCP/IP', 'HTTP', 'DNS', 'Network Security']
  }
];

export const advancedTopics: Topic[] = [
  {
    id: 'number-theory',
    title: 'Number Theory',
    icon: 'code',
    shortDescription: 'Advanced mathematical concepts for CP',
    description: 'Master number theory concepts essential for competitive programming including prime numbers, modular arithmetic, and combinatorics.',
    tags: ['Prime Numbers', 'Modular Arithmetic', 'GCD/LCM', 'Combinatorics']
  },
  {
    id: 'advanced-data-structures',
    title: 'Advanced Data Structures',
    icon: 'layers',
    shortDescription: 'Complex data structures for optimization',
    description: 'Learn advanced data structures like segment trees, Fenwick trees, and disjoint set union for solving complex algorithmic problems.',
    tags: ['Segment Trees', 'Fenwick Trees', 'DSU', 'Trie']
  },
  {
    id: 'game-theory',
    title: 'Game Theory',
    icon: 'code',
    shortDescription: 'Strategic decision-making algorithms',
    description: 'Understand game theory concepts and algorithms used in competitive programming for optimal strategy problems.',
    tags: ['Minimax', 'Sprague-Grundy', 'Nim Game', 'Dynamic Games']
  },
  {
    id: 'string-algorithms',
    title: 'Advanced String Algorithms',
    icon: 'code',
    shortDescription: 'Complex string manipulation techniques',
    description: 'Master advanced string algorithms including pattern matching, string hashing, and suffix arrays.',
    tags: ['KMP', 'Z Algorithm', 'Suffix Arrays', 'String Hashing']
  },
  {
    id: 'geometric-algorithms',
    title: 'Geometric Algorithms',
    icon: 'layers',
    shortDescription: 'Computational geometry concepts',
    description: 'Learn computational geometry algorithms for solving geometric problems in competitive programming.',
    tags: ['Convex Hull', 'Line Sweep', 'Point Location', 'Geometric Transformations']
  }
];