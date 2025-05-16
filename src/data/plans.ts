import { dsaTopics, nonDsaTopics } from "./topics";

// Types
interface MicroTopic {
  id: string;
  name: string;
  completed: boolean;
  markedForRevision: boolean;
  topicId: string;
  topicType: "DSA" | "NonDSA";
  resourceLink?: string;
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

export interface Plan {
  id: string;
  name: string;
  duration: string;
  description: string;
  weeks: WeekPlan[];
}

// Resource links configuration
// Centralized resource repository - easier to update
const resourceLinks = {
  // DSA resources
  arrays: {
    "One-dimensional arrays implementation":
      "https://www.geeksforgeeks.org/arrays-in-java/",

    "One-daddy arrasdfadssays implementation":
      "https://www.geeksforgeeks.org/arrays-in-java/",
    "Multi-dimensional arrays":
      "https://www.geeksforgeeks.org/multidimensional-arrays-in-java/",
    "Dynamic arrays (ArrayList/Vector)":
      "https://www.geeksforgeeks.org/arraylist-in-java/",
    "String manipulation techniques":
      "https://www.geeksforgeeks.org/string-manipulation-java/",
    "In-place operations": "https://www.geeksforgeeks.org/in-place-algorithm/",
    "Sliding window technique":
      "https://www.geeksforgeeks.org/window-sliding-technique/",
    "Two-pointer technique":
      "https://www.geeksforgeeks.org/two-pointers-technique/",
    "Dutch national flag algorithm":
      "https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/",
    "Kadane's algorithm":
      "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/",
    "Array rotation algorithms":
      "https://www.geeksforgeeks.org/array-rotation/",
  },
  "linked-lists": {
    "Singly linked list implementation":
      "https://www.geeksforgeeks.org/implementing-a-linked-list-in-java-using-class/",
    "Doubly linked list implementation":
      "https://www.geeksforgeeks.org/doubly-linked-list/",
    "Circular linked list":
      "https://www.geeksforgeeks.org/circular-linked-list/",
    "Linked list traversal":
      "https://www.geeksforgeeks.org/traversal-linked-list/",
    "Finding middle element":
      "https://www.geeksforgeeks.org/write-a-c-function-to-print-the-middle-of-the-linked-list/",
    "Detecting cycles":
      "https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/",
    "Reversing a linked list":
      "https://www.geeksforgeeks.org/reverse-a-linked-list/",
    "Merging sorted linked lists":
      "https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/",
    "Intersection of linked lists":
      "https://www.geeksforgeeks.org/write-a-function-to-get-the-intersection-point-of-two-linked-lists/",
    "Clone a linked list with random pointers":
      "https://www.geeksforgeeks.org/clone-linked-list-next-random-pointer-o1-space/",
  },
  // Non-DSA resources
  oops: {
    "Classes and objects":
      "https://www.geeksforgeeks.org/classes-objects-java/",
    "Inheritance and its types":
      "https://www.geeksforgeeks.org/inheritance-in-java/",
    "Polymorphism (compile-time & runtime)":
      "https://www.geeksforgeeks.org/polymorphism-in-java/",
    "Encapsulation and data hiding":
      "https://www.geeksforgeeks.org/encapsulation-in-java/",
    "Abstraction with abstract classes":
      "https://www.geeksforgeeks.org/abstract-classes-in-java/",
    "Interfaces implementation":
      "https://www.geeksforgeeks.org/interfaces-in-java/",
    "Static vs non-static members":
      "https://www.geeksforgeeks.org/static-keyword-java/",
    "Constructors and their types":
      "https://www.geeksforgeeks.org/constructors-in-java/",
    "Method overloading vs overriding":
      "https://www.geeksforgeeks.org/difference-between-method-overloading-and-method-overriding-in-java/",
    "Exception handling principles":
      "https://www.geeksforgeeks.org/exceptions-in-java/",
  },
  // CSES problems
  cses: {
    "Weird Algorithm": "https://cses.fi/problemset/task/1068",
    "Missing Number": "https://cses.fi/problemset/task/1083",
    Repetitions: "https://cses.fi/problemset/task/1069",
    "Increasing Array": "https://cses.fi/problemset/task/1094",
    Permutations: "https://cses.fi/problemset/task/1070",
    "Number Spiral": "https://cses.fi/problemset/task/1071",
    "Two Knights": "https://cses.fi/problemset/task/1072",
    "Two Sets": "https://cses.fi/problemset/task/1092",
    "Bit Strings": "https://cses.fi/problemset/task/1617",
    "Trailing Zeros": "https://cses.fi/problemset/task/1618",
    Apartments: "https://cses.fi/problemset/task/1084",
    "Ferris Wheel": "https://cses.fi/problemset/task/1090",
    "Dice Combinations": "https://cses.fi/problemset/task/1633",
    "Minimizing Coins": "https://cses.fi/problemset/task/1634",
    "Counting Rooms": "https://cses.fi/problemset/task/1192",
    Labyrinth: "https://cses.fi/problemset/task/1193",
    "Static Range Sum": "https://cses.fi/problemset/task/1646",
    Exponentiation: "https://cses.fi/problemset/task/1095",
    "String Matching": "https://cses.fi/problemset/task/1753",
    "Elevator Rides": "https://cses.fi/problemset/task/1653",
  },
};

const topicContent = {
  arrays: [
    "One-dimensional arrays implementation",
    "One-daddy arrasdfadssays implementation",
    "Multi-dimensional arrays",
    "Dynamic arrays (ArrayList/Vector)",
    "String manipulation techniques",
    "In-place operations",
    "Sliding window technique",
    "Two-pointer technique",
    "Dutch national flag algorithm",
    "Kadane's algorithm",
    "Array rotation algorithms",
  ],
  "linked-lists": [
    "Singly linked list implementation",
    "Doubly linked list implementation",
    "Circular linked list",
    "Linked list traversal",
    "Finding middle element",
    "Detecting cycles",
    "Reversing a linked list",
    "Merging sorted linked lists",
    "Intersection of linked lists",
    "Clone a linked list with random pointers",
  ],
  "stacks-queues": [
    "Stack implementation using arrays",
    "Stack implementation using linked list",
    "Queue implementation using arrays",
    "Queue implementation using linked list",
    "Circular queue implementation",
    "Priority queue basics",
    "Expression evaluation using stacks",
    "Next greater/smaller element problems",
    "Queue using stacks",
    "Stack using queues",
  ],
  trees: [
    "Binary tree implementation",
    "Binary search tree implementation",
    "Tree traversals (inorder, preorder, postorder)",
    "Level order traversal",
    "Height/depth of a tree",
    "Lowest common ancestor",
    "Balanced binary trees",
    "Tree serialization & deserialization",
    "Path sum problems",
    "Binary tree to doubly linked list",
  ],
  graphs: [
    "Graph representation (adjacency matrix)",
    "Graph representation (adjacency list)",
    "Breadth-first search (BFS)",
    "Depth-first search (DFS)",
    "Shortest path algorithms (Dijkstra's)",
    "Minimum spanning tree (Kruskal's)",
    "Minimum spanning tree (Prim's)",
    "Topological sorting",
    "Cycle detection",
    "Connected components",
    "Disjoint Set (Union-Find)",
  ],
  "dynamic-programming": [
    "Optimal substructure & overlapping subproblems",
    "Memoization technique",
    "Tabulation technique",
    "Fibonacci series with DP",
    "Longest common subsequence",
    "Longest increasing subsequence",
    "Coin change problem",
    "0/1 Knapsack problem",
    "Matrix chain multiplication",
    "Edit distance problem",
  ],
  "sorting-searching": [
    "Bubble sort implementation",
    "Selection sort implementation",
    "Insertion sort implementation",
    "Merge sort implementation",
    "Quick sort implementation",
    "Heap sort basics",
    "Counting sort for specific ranges",
    "Binary search implementation",
    "Search in rotated sorted array",
    "Median of two sorted arrays",
  ],
  greedy: [
    "Activity selection problem",
    "Fractional knapsack problem",
    "Huffman coding compression",
    "Minimum coin change (greedy approach)",
    "Job sequencing with deadlines",
    "Minimum spanning trees as greedy",
    "Dijkstra's algorithm as greedy",
    "Interval scheduling problems",
    "Egyptian fraction",
    "Policemen catch thieves",
  ],
  extras: [
    "Rabin-Karp string matching",
    "KMP algorithm",
    "Meet in the middle technique",
    "Bit manipulation basics",
    "Counting bits techniques",
    "XOR properties and puzzles",
    "Trie data structure",
    "Segment tree basics",
    "Fenwick tree (Binary Indexed Tree)",
    "Backtracking principles",
    "Divide and conquer approach",
  ],
  "binary-search": [
    "Binary search implementation",
    "Binary search on sorted arrays",
    "Binary search on rotated arrays",
    "Search in 2D sorted matrix",
    "Find first and last occurrence",
    "Floor and ceiling of a number",
    "Search in infinite sorted array",
    "Minimum in rotated sorted array",
    "Search in nearly sorted array",
    "Find peak element",
  ],
  tries: [
    "Trie implementation",
    "Insert and search operations in Trie",
    "Delete operation in Trie",
    "Prefix matching with Tries",
    "Word suggestions & autocomplete",
    "Compressed Tries (Radix Tree)",
    "Suffix Trees introduction",
    "Segment Tree basics",
    "Fenwick Tree (Binary Indexed Tree)",
    "Disjoint Set (Union-Find)",
  ],
  "dynamic-programming-part1": [
    "Optimal substructure & overlapping subproblems",
    "Memoization technique",
    "Tabulation technique",
    "Fibonacci series with DP",
    "Longest common subsequence",
    "Longest increasing subsequence",
    "Edit distance problem",
    "Minimum coin change problem",
    "Maximum subarray problem",
    "Matrix chain multiplication",
  ],
  "dynamic-programming-part2": [
    "0/1 Knapsack problem",
    "Unbounded Knapsack problem",
    "Subset sum problem",
    "Partition equal subset sum",
    "Rod cutting problem",
    "Word break problem",
    "Palindrome partitioning",
    "Minimum jumps to reach end",
    "Maximum profit in job scheduling",
    "Longest palindromic subsequence",
  ],
  "hard-problems": [
    "Hard array manipulation problems",
    "Complex graph problems",
    "Advanced tree problems",
    "Hard dynamic programming problems",
    "Competitive programming techniques",
    "String matching algorithms",
    "NP-complete problem approximations",
    "Randomized algorithms",
    "Amortized analysis techniques",
    "Complex algorithm design patterns",
  ],
  "cses-intro": [
    "Weird Algorithm",
    "Missing Number",
    "Repetitions",
    "Increasing Array",
    "Permutations",
    "Number Spiral",
    "Two Knights",
    "Two Sets",
    "Bit Strings",
    "Trailing Zeros",
  ],
  "cses-advanced": [
    "Sorting and Searching - Apartments",
    "Sorting and Searching - Ferris Wheel",
    "Dynamic Programming - Dice Combinations",
    "Dynamic Programming - Minimizing Coins",
    "Graph Algorithms - Counting Rooms",
    "Graph Algorithms - Labyrinth",
    "Range Queries - Static Range Sum",
    "Mathematics - Exponentiation",
    "String Algorithms - String Matching",
    "Additional Problems - Elevator Rides",
  ],

  // Non-DSA Topics
  oops: [
    "Classes and objects",
    "Inheritance and its types",
    "Polymorphism (compile-time & runtime)",
    "Encapsulation and data hiding",
    "Abstract classes and interfaces (JAVA)",
    "Static vs non-static members",
    "Constructors and their types",
    "Method overloading vs overriding",
    "Exception handling principles",
  ],
  "system-design": [
    "Client-server architecture",
    "Microservices vs monolithic",
    "Load balancing techniques",
    "Caching strategies",
    "Database scaling (horizontal/vertical)",
    "CAP theorem understanding",
    "Sharding & partitioning data",
    "Message queues and their uses",
    "API gateway design",
    "Distributed systems principles",
  ],
  dbms: [
    "Relational model basics",
    "SQL query fundamentals",
    "Normalization forms (1NF to BCNF)",
    "Indexing and its types",
    "Transactions and ACID properties",
    "Concurrency control techniques",
    "Entity-Relationship modeling",
    "Joins and their types",
    "NoSQL database concepts",
    "Database security principles",
  ],
  os: [
    "Process management",
    "Thread management",
    "CPU scheduling algorithms",
    "Deadlock prevention & detection",
    "Memory management techniques",
    "Virtual memory and paging",
    "File systems and their types",
    "I/O management",
    "Inter-process communication",
    "Linux commands and shell scripting",
  ],
  "os-part1": [
    "Process management",
    "Thread management",
    "CPU scheduling algorithms",
    "Deadlock prevention & detection",
    "Concurrency and synchronization",
  ],
  "os-part2": [
    "Memory management techniques",
    "Virtual memory and paging",
    "File systems and their types",
    "I/O management",
    "Inter-process communication",
    "Linux commands and shell scripting",
  ],
  networking: [
    "OSI model layers",
    "TCP/IP protocol suite",
    "IP addressing and subnetting",
    "Routing protocols basics",
    "DNS and its working",
    "HTTP/HTTPS protocols",
    "Socket programming basics",
    "Network security fundamentals",
    "Wireless networking concepts",
    "Software-defined networking",
  ],
  "non-dsa-revision": [
    "OOPs concepts revision",
    "Operating Systems key concepts",
    "DBMS fundamental principles",
    "System design patterns",
    "Networking protocols review",
    "Common interview questions",
    "Design pattern implementations",
    "Threading and concurrency",
    "API design principles",
    "Performance optimization techniques",
  ],
};

const topicTitles = {
  arrays: "Arrays & Strings",
  "linked-lists": "Linked Lists",
  "stacks-queues": "Stacks & Queues",
  trees: "Trees & Binary Trees",
  graphs: "Graphs",
  "dynamic-programming": "Dynamic Programming",
  "sorting-searching": "Sorting & Searching",
  greedy: "Greedy Algorithms",
  extras: "Advanced Algorithms",
  "binary-search": "Binary Search",
  tries: "Tries & Advanced Data Structures",
  "dynamic-programming-part1": "Dynamic Programming - Part 1",
  "dynamic-programming-part2": "Dynamic Programming - Part 2",
  "hard-problems": "Hard Problems & Advanced Topics",
  "cses-intro": "CSES Problem Set - Introduction",
  "cses-advanced": "CSES Problem Set - Advanced",

  // Non-DSA Topics
  oops: "OOP Concepts",
  "system-design": "System Design",
  dbms: "Database Management",
  os: "Operating Systems",
  "os-part1": "Operating Systems - Part 1",
  "os-part2": "Operating Systems - Part 2",
  networking: "Computer Networks",
  "non-dsa-revision": "Non-DSA Topics Revision",
};

// Helper function to get topic title with fallback
const getTopicTitle = (id: string): string => {
  return topicTitles[id as keyof typeof topicTitles] || id;
};

// Helper function to create a microtopic with specific name
const createMicroTopic = (
  name: string,
  index: number,
  topicId: string,
  topicType: "DSA" | "NonDSA"
): MicroTopic => {
  // Look up the resource link from the resourceLinks object if available
  const categoryResources =
    resourceLinks[topicId as keyof typeof resourceLinks];
  let resourceLink: string | undefined = undefined;

  if (categoryResources) {
    resourceLink = categoryResources[name as keyof typeof categoryResources];
  }

  return {
    id: `${topicId}-${index}`,
    name,
    completed: false,
    markedForRevision: false,
    topicId,
    topicType,
    resourceLink,
  };
};

// Helper function to create a topic with its microtopics
const createTopic = (
  id: string,
  type: "DSA" | "NonDSA",
  customName?: string
): Topic => {
  // Get topic content from the repository or use empty array if not found
  const microTopicNames = topicContent[id as keyof typeof topicContent] || [];

  return {
    id,
    name: customName || getTopicTitle(id),
    type,
    microTopics: microTopicNames.map((name, index) =>
      createMicroTopic(name, index, id, type)
    ),
  };
};

// Topic template interface
interface TopicTemplate {
  id: string;
  type: "DSA" | "NonDSA";
  name?: string; // Optional custom name
}

// Plan templates
const planTemplates: Record<
  string,
  {
    name: string;
    duration: string;
    description: string;
    weekTopics: TopicTemplate[][];
  }
> = {
  "4-week": {
    name: "4-Week Plan",
    duration: "4 weeks",
    description:
      "Intensive preparation focusing on core concepts, ideal for quick revision before interviews.",
    weekTopics: [
      // Week 1
      [
        { id: "arrays", type: "DSA" },
        { id: "linked-lists", type: "DSA" },
        { id: "oops", type: "NonDSA" },
      ],
      // Week 2
      [
        { id: "stacks-queues", type: "DSA" },
        { id: "trees", type: "DSA" },
        { id: "dbms", type: "NonDSA" },
      ],
      // Week 3
      [
        { id: "graphs", type: "DSA" },
        { id: "sorting-searching", type: "DSA" },
        { id: "os", type: "NonDSA" },
      ],
      // Week 4
      [
        { id: "dynamic-programming", type: "DSA" },
        { id: "greedy", type: "DSA" },
        { id: "system-design", type: "NonDSA" },
        { id: "networking", type: "NonDSA" },
      ],
    ],
  },
  "6-week": {
    name: "6-Week Plan",
    duration: "6 weeks",
    description:
      "Balanced preparation covering all essential topics at a moderate pace.",
    weekTopics: [
      // Week 1
      [
        { id: "arrays", type: "DSA" },
        { id: "linked-lists", type: "DSA" },
        { id: "binary-search", type: "DSA" },
        { id: "oops", type: "NonDSA" },
      ],
      // Week 2-6 similar structure...
      // Week 2
      [
        { id: "stacks-queues", type: "DSA" },
        { id: "greedy", type: "DSA" },
        { id: "os-part1", type: "NonDSA" },
      ],
      // Week 3
      [
        { id: "trees", type: "DSA" },
        { id: "sorting-searching", type: "DSA", name: "Sorting Algorithms" },
        { id: "os-part2", type: "NonDSA" },
      ],
      // Week 4
      [
        { id: "graphs", type: "DSA" },
        { id: "tries", type: "DSA" },
        { id: "dbms", type: "NonDSA" },
      ],
      // Week 5
      [
        { id: "dynamic-programming-part1", type: "DSA" },
        { id: "extras", type: "DSA" },
        { id: "system-design", type: "NonDSA" },
      ],
      // Week 6
      [
        { id: "dynamic-programming-part2", type: "DSA" },
        { id: "hard-problems", type: "DSA" },
        { id: "non-dsa-revision", type: "NonDSA" },
        { id: "networking", type: "NonDSA" },
      ],
    ],
  },
  "8-week": {
    name: "8-Week Plan",
    duration: "8 weeks",
    description:
      "Comprehensive preparation with in-depth coverage of all concepts plus practice time.",
    weekTopics: [
      // Week 1
      [{ id: "arrays", type: "DSA" }],
      // Week 2
      [
        { id: "linked-lists", type: "DSA" },
        { id: "oops", type: "NonDSA" },
      ],
      // Week 3
      [
        { id: "stacks-queues", type: "DSA" },
        { id: "dbms", type: "NonDSA" },
      ],
      // Week 4
      [{ id: "trees", type: "DSA" }],
      // Week 5
      [
        { id: "graphs", type: "DSA" },
        { id: "os", type: "NonDSA" },
      ],
      // Week 6
      [
        { id: "sorting-searching", type: "DSA" },
        { id: "networking", type: "NonDSA" },
        { id: "cses-intro", type: "DSA" },
      ],
      // Week 7
      [{ id: "dynamic-programming", type: "DSA" }],
      // Week 8
      [
        { id: "greedy", type: "DSA" },
        { id: "extras", type: "DSA" },
        { id: "system-design", type: "NonDSA" },
        { id: "cses-advanced", type: "DSA" },
      ],
    ],
  },
};

// Generate plans function
export const generatePlans = (): Plan[] => {
  const plans: Plan[] = [];

  // Generate each plan from the templates
  Object.entries(planTemplates).forEach(([id, template]) => {
    const plan: Plan = {
      id,
      name: template.name,
      duration: template.duration,
      description: template.description,
      weeks: template.weekTopics.map((weekTopics, index) => ({
        week: index + 1,
        topics: weekTopics.map((topic) =>
          createTopic(topic.id, topic.type, topic.name)
        ),
      })),
    };

    plans.push(plan);
  });

  return plans;
};

export default generatePlans;
