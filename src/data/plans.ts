// Types
interface MicroTopic {
  id: string;
  name: string;
  completed: boolean;
  markedForRevision: boolean;
  topicId: string;
  topicType: "DSA" | "NonDSA";
  videoLink?: string;
  articleLink?: string;
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

// Topic template interface
interface TopicTemplate {
  id: string;
  type: "DSA" | "NonDSA";
  name?: string; // Optional custom name
}

// Google Sheets data interface
interface TopicDataRow {
  topicType: "DSA" | "NonDSA";
  topicId: string;
  microTopicName: string;
  videoLink?: string;
  articleLink?: string;
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
  // "4-week": {
  //   name: "4-Week Plan",
  //   duration: "4 weeks",
  //   description:
  //     "Intensive preparation focusing on core concepts, ideal for quick revision before interviews.",
  //   weekTopics: [
  //     // Week 1
  //     [
  //       { id: "arrays", type: "DSA" },
  //       { id: "linked-lists", type: "DSA" },
  //       { id: "oops", type: "NonDSA" },
  //     ],
  //     // Week 2
  //     [
  //       { id: "stacks-queues", type: "DSA" },
  //       { id: "trees", type: "DSA" },
  //       { id: "dbms", type: "NonDSA" },
  //     ],
  //     // Week 3
  //     [
  //       { id: "graphs", type: "DSA" },
  //       { id: "sorting-searching", type: "DSA" },
  //       { id: "os", type: "NonDSA" },
  //     ],
  //     // Week 4
  //     [
  //       { id: "dynamic-programming", type: "DSA" },
  //       { id: "greedy", type: "DSA" },
  //       { id: "system-design", type: "NonDSA" },
  //       { id: "networking", type: "NonDSA" },
  //     ],
  //   ],
  // },
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
  // "8-week": {
  //   name: "8-Week Plan",
  //   duration: "8 weeks",
  //   description:
  //     "Comprehensive preparation with in-depth coverage of all concepts plus practice time.",
  //   weekTopics: [
  //     // Week 1
  //     [{ id: "arrays", type: "DSA" }],
  //     // Week 2
  //     [
  //       { id: "linked-lists", type: "DSA" },
  //       { id: "oops", type: "NonDSA" },
  //     ],
  //     // Week 3
  //     [
  //       { id: "stacks-queues", type: "DSA" },
  //       { id: "dbms", type: "NonDSA" },
  //     ],
  //     // Week 4
  //     [{ id: "trees", type: "DSA" }],
  //     // Week 5
  //     [
  //       { id: "graphs", type: "DSA" },
  //       { id: "os", type: "NonDSA" },
  //     ],
  //     // Week 6
  //     [
  //       { id: "sorting-searching", type: "DSA" },
  //       { id: "networking", type: "NonDSA" },
  //       { id: "cses-intro", type: "DSA" },
  //     ],
  //     // Week 7
  //     [{ id: "dynamic-programming", type: "DSA" }],
  //     // Week 8
  //     [
  //       { id: "greedy", type: "DSA" },
  //       { id: "extras", type: "DSA" },
  //       { id: "system-design", type: "NonDSA" },
  //       { id: "cses-advanced", type: "DSA" },
  //     ],
  //   ],
  // },
};

// Topic titles cache (will be populated from Google Sheets)
let topicTitlesCache: Record<string, string> = {};

// Fetch data from Google Sheets
// Example URL for published Google Sheet as CSV:
// https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv
async function fetchTopicDataFromGoogleSheets(
  sheetUrl: string
): Promise<TopicDataRow[]> {
  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const csvText = await response.text();

    // Parse CSV - This is a simplified approach. In production, use PapaParse or similar
    const rows = csvText.split("\n").map((row) => row.split(","));

    // Assuming first row is header: topicType,topicId,microTopicName,videoLink,articleLink
    const data: TopicDataRow[] = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length >= 3) {
        data.push({
          topicType: row[0].trim() as "DSA" | "NonDSA",
          topicId: row[1].trim(),
          microTopicName: row[2].trim(),
          videoLink: row[3]?.trim() || undefined,
          articleLink: row[4]?.trim() || undefined,
        });
      }
    }

    return data;
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    throw error;
  }
}

// Process data into topic content and titles
function processSheetData(data: TopicDataRow[]): {
  topicContent: Record<string, string[]>;
  topicTitles: Record<string, string>;
} {
  const topicContent: Record<string, string[]> = {};
  const topicTitles: Record<string, string> = {};
  const topicIdToTitle: Map<string, Set<string>> = new Map();

  // Group micro topics by topic ID
  data.forEach((row) => {
    if (!topicContent[row.topicId]) {
      topicContent[row.topicId] = [];
    }

    if (!topicContent[row.topicId].includes(row.microTopicName)) {
      topicContent[row.topicId].push(row.microTopicName);
    }

    // Collect unique topic IDs and their micro topic names (for later inferring titles)
    if (!topicIdToTitle.has(row.topicId)) {
      topicIdToTitle.set(row.topicId, new Set());
    }
    topicIdToTitle.get(row.topicId)?.add(row.microTopicName);
  });

  // Extract topic titles from data
  // This assumes your sheet has some way to identify the topic title
  // For example, you might have a special row or convention for titles
  // For now, we'll use the topic ID with proper formatting
  topicIdToTitle.forEach((microTopics, topicId) => {
    // Convert topic ID to title format (e.g., "linked-lists" -> "Linked Lists")
    const formattedTitle = topicId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    topicTitles[topicId] = formattedTitle;
  });

  return { topicContent, topicTitles };
}

// Create a map of resource links from sheet data
function createResourceLinksMap(
  data: TopicDataRow[]
): Record<
  string,
  Record<string, { videoLink?: string; articleLink?: string }>
> {
  const resourceLinks: Record<
    string,
    Record<string, { videoLink?: string; articleLink?: string }>
  > = {};

  data.forEach((row) => {
    if (!resourceLinks[row.topicId]) {
      resourceLinks[row.topicId] = {};
    }

    resourceLinks[row.topicId][row.microTopicName] = {
      videoLink: row.videoLink,
      articleLink: row.articleLink,
    };
  });

  return resourceLinks;
}

// Helper function to get topic title with fallback
function getTopicTitle(id: string): string {
  return topicTitlesCache[id] || id;
}

// Helper function to create a microtopic with specific name
async function createMicroTopic(
  name: string,
  index: number,
  topicId: string,
  topicType: "DSA" | "NonDSA",
  resourceLinksMap: Record<
    string,
    Record<string, { videoLink?: string; articleLink?: string }>
  >
): Promise<MicroTopic> {
  // Look up the resource links from the resourceLinks object if available
  const categoryResources = resourceLinksMap[topicId];
  let videoLink: string | undefined = undefined;
  let articleLink: string | undefined = undefined;

  if (categoryResources && categoryResources[name]) {
    videoLink = categoryResources[name].videoLink;
    articleLink = categoryResources[name].articleLink;
  }

  return {
    id: `${topicId}-${index}`,
    name,
    completed: false,
    markedForRevision: false,
    topicId,
    topicType,
    videoLink,
    articleLink,
  };
}

// Helper function to create a topic with its microtopics
async function createTopic(
  id: string,
  type: "DSA" | "NonDSA",
  topicContent: Record<string, string[]>,
  resourceLinksMap: Record<
    string,
    Record<string, { videoLink?: string; articleLink?: string }>
  >,
  customName?: string
): Promise<Topic> {
  // Get topic content from the repository or use empty array if not found
  const microTopicNames = topicContent[id] || [];

  const microTopics = await Promise.all(
    microTopicNames.map((name, index) =>
      createMicroTopic(name, index, id, type, resourceLinksMap)
    )
  );

  return {
    id,
    name: customName || getTopicTitle(id),
    type,
    microTopics,
  };
}

// Generate plans function
export const generatePlans = async (
  googleSheetUrl: string
): Promise<Plan[]> => {
  const plans: Plan[] = [];

  try {
    // Fetch data from Google Sheets
    const sheetData = await fetchTopicDataFromGoogleSheets(googleSheetUrl);

    // Process the data
    const { topicContent, topicTitles } = processSheetData(sheetData);
    topicTitlesCache = topicTitles;

    // Create resource links map
    const resourceLinksMap = createResourceLinksMap(sheetData);

    // Generate each plan from the templates
    for (const [id, template] of Object.entries(planTemplates)) {
      const weeks: WeekPlan[] = [];

      for (
        let weekIndex = 0;
        weekIndex < template.weekTopics.length;
        weekIndex++
      ) {
        const weekTopics = template.weekTopics[weekIndex];
        const topics: Topic[] = [];

        for (const topicTemplate of weekTopics) {
          const topic = await createTopic(
            topicTemplate.id,
            topicTemplate.type,
            topicContent,
            resourceLinksMap,
            topicTemplate.name
          );
          topics.push(topic);
        }

        weeks.push({
          week: weekIndex + 1,
          topics,
        });
      }

      plans.push({
        id,
        name: template.name,
        duration: template.duration,
        description: template.description,
        weeks,
      });
    }

    return plans;
  } catch (error) {
    console.error("Error generating plans:", error);
    throw error;
  }
};

export default generatePlans;
