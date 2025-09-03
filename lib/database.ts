import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USR,
  password: process.env.MYSQL_PAS,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;

export async function getConnection() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  } else {
    pool.releaseConnection;
  }
  return pool;
}


// Mock database implementation - replace with your MySQL connection
export interface Story {
  id: number;
  title: string;
  date: string;
  section: string;
  content: string;
  excerpt: string;
  tags: string;
  fullWidth: boolean;
  author: string;
  url_slug: string;
  views: number;
  featured: boolean;
}

// Mock data matching your database structure
export const stories: Story[] = [
  {
    id: 1,
    title: "Cats Working From Home Accused of Doing Absolutely Nothing",
    date: "2025-01-15",
    section: "National",
    content: "Despite having full access to laptops, standing desks, and coffee breaks, the vast majority of housecats working remotely have contributed absolutely nothing to their companies. According to a study by the Institute of Feline Labor Dynamics, over 97% of cats have done little more than sit on keyboards, walk into Zoom meetings uninvited, and nap for 18 hours straight.\n\n\"One cat sent me 14 blank emails and then threw up on the router,\" said tech CEO Linda Harmon. \"I'm still giving her a bonus.\"\n\nResearchers conclude the cats are not lazy—they're just misunderstood visionaries. Their latest startup, Pawductivity™, has already raised $12 million in venture funding.",
    excerpt: "New study finds cats in remote roles have done 'absolutely nothing' but still demand snacks and equity.",
    tags: '["remote work", "cats"]',
    fullWidth: true,
    author: "Mary Kolsen",
    url_slug: "cats-working-from-home-accused",
    views: 14,
    featured: true
  },
  {
    id: 2,
    title: "Local Man Discovers Coffee Shop WiFi Password Actually Works",
    date: "2025-01-15",
    section: "Local",
    content: "In a shocking development that has left the entire neighborhood questioning reality, local resident Jim Patterson successfully connected to the WiFi at Cosmic Bean Coffee using the password written on their chalkboard.\n\n\"I've been trying for three years,\" Patterson explained while frantically downloading Netflix shows. \"I assumed 'CosmicBean123' was just decorative.\"\n\nThe coffee shop owner, Maria Santos, expressed equal surprise: \"We put that password up as a joke. We didn't think anyone would actually try it.\"\n\nPatterson has since become something of a local celebrity, with neighbors asking him to help them connect to their own home networks.",
    excerpt: "After three years of failed attempts, Jim Patterson cracks the code that was literally written on the wall.",
    tags: '["local news", "technology", "coffee"]',
    fullWidth: false,
    author: "Steve Rodriguez",
    url_slug: "coffee-shop-wifi-password-works",
    views: 8,
    featured: false
  },
  {
    id: 3,
    title: "Stock Market Rises After Investor Accidentally Hits 'Buy' Instead of 'Sell'",
    date: "2025-01-15",
    section: "Business",
    content: "Wall Street experienced its biggest single-day gain in months after amateur investor Derek Chen accidentally purchased 10,000 shares of a struggling tech company while trying to sell his coffee shop stock.\n\n\"I was distracted by my cat walking across the keyboard,\" Chen admitted. \"Next thing I know, I own a chunk of a company that makes smart doorknobs.\"\n\nThe accidental purchase triggered a buying frenzy as other investors assumed Chen had insider information. The doorknob company's stock soared 340% before anyone realized it was all a mistake.\n\n\"This is exactly why I tell people to invest with their heart, not their brain,\" said financial advisor Margaret Webb. \"Sometimes your cat knows best.\"",
    excerpt: "Derek Chen's feline-assisted trading mistake becomes Wall Street's biggest win of the year.",
    tags: '["business", "stock market", "accidents"]',
    fullWidth: false,
    author: "Amanda Foster",
    url_slug: "accidental-stock-purchase-market-rise",
    views: 23,
    featured: false
  },
  {
    id: 4,
    title: "Weather Alert: Tuesday's Forecast Calls for Mild Confusion with Scattered Bewilderment",
    date: "2025-01-15",
    section: "Weather",
    content: "Meteorologist Dr. Patricia Windham issued an unusual weather advisory for Tuesday, warning residents to expect widespread confusion with isolated pockets of clarity lasting no more than 15 minutes.\n\n\"We're seeing a high-pressure system of bureaucratic nonsense moving in from the northwest, colliding with a low-pressure front of common sense,\" Dr. Windham explained while gesturing at a map covered in question marks.\n\nThe forecast includes a 60% chance of people staring blankly at their phones, with temperatures ranging from \"mildly frustrated\" to \"completely baffled.\" Residents are advised to wear comfortable shoes and keep snacks handy.\n\n\"There's also a slight possibility of raining staplers around 3 PM,\" she added casually. \"Nothing we haven't seen before.\"",
    excerpt: "Dr. Windham warns of incoming confusion front, possible office supply precipitation.",
    tags: '["weather", "confusion", "staplers"]',
    fullWidth: false,
    author: "Dr. Patricia Windham",
    url_slug: "weather-confusion-scattered-bewilderment",
    views: 31,
    featured: true
  },
  {
    id: 5,
    title: "Sports Team Wins Game by Actually Showing Up This Time",
    date: "2025-01-15",
    section: "Sports",
    content: "The Springfield Sluggers achieved their first victory of the season using a revolutionary new strategy: attending the game. After weeks of confusion about game schedules, the team finally arrived at the correct stadium at the correct time.\n\n\"It's amazing what happens when you're physically present,\" said coach Mike Thompson. \"We've been playing against empty stadiums for three weeks thinking we were really good.\"\n\nThe opposing team, caught off guard by actually having opponents, struggled to adapt. \"We've gotten used to just running around the field by ourselves,\" said rival player Janet Martinez. \"Having someone to compete against was really confusing.\"\n\nThe Sluggers plan to continue this attendance-based strategy for future games, though they admit it's \"pretty exhausting.\"",
    excerpt: "Springfield Sluggers discover the secret to winning: showing up to games.",
    tags: '["sports", "attendance", "strategy"]',
    fullWidth: false,
    author: "Mike Chen",
    url_slug: "team-wins-by-showing-up",
    views: 19,
    featured: false
  },
  {
    id: 6,
    title: "Celebrity Spotted Doing Completely Normal Thing",
    date: "2025-01-15",
    section: "Entertainment",
    content: "In shocking entertainment news, award-winning actor Jennifer Hayes was photographed doing laundry at a public laundromat, sending fans into a frenzy of normalcy.\n\n\"She folded her towels just like a regular person,\" reported witness Carol Kim. \"It was the most relatable thing I've ever seen. I cried a little.\"\n\nHayes, who was apparently unaware that basic human activities would generate headlines, seemed confused by the attention. \"I ran out of clean shirts,\" she explained to reporters. \"What was I supposed to do, wear a dirty one?\"\n\nThe laundromat has since been declared a historical landmark, and several other celebrities have been spotted there attempting to seem normal while cameras flash around them.",
    excerpt: "Jennifer Hayes shocks fans by washing clothes like ordinary humans do.",
    tags: '["entertainment", "celebrity", "laundry"]',
    fullWidth: false,
    author: "Lisa Park",
    url_slug: "celebrity-does-normal-thing",
    views: 42,
    featured: false
  },
  {
    id: 7,
    title: "Politician Accidentally Tells Truth, Immediately Apologizes",
    date: "2025-01-15",
    section: "Politics",
    content: "During a routine press conference yesterday, Senator Robert Williams momentarily forgot his talking points and accidentally provided a completely honest answer to a reporter's question about campaign funding.\n\n\"Yes, my biggest donor does influence my voting decisions,\" Williams said before his aide frantically signaled from the back of the room. \"Wait, no, what I meant to say was... democracy... freedom... something about children?\"\n\nWilliams quickly issued a formal apology for the \"inappropriate moment of transparency\" and promised it would never happen again. His approval ratings mysteriously increased by 15 points overnight.\n\n\"Honesty is a dangerous precedent,\" explained political analyst Dr. Sarah Martinez. \"If politicians start telling the truth regularly, the entire system could collapse.\"",
    excerpt: "Senator Williams's brief moment of honesty sends shockwaves through political establishment.",
    tags: '["politics", "honesty", "accident"]',
    fullWidth: false,
    author: "Robert Taylor",
    url_slug: "politician-accidentally-tells-truth",
    views: 67,
    featured: false
  },
  {
    id: 8,
    title: "Opinion: Why Pineapple on Pizza is Actually a Conspiracy by Big Fruit",
    date: "2025-01-15",
    section: "Opinion",
    content: "Friends, we need to talk about the elephant in the room—or should I say, the pineapple on the pizza. This isn't just about taste preferences anymore. This is about control.\n\nThink about it: Who benefits when we put tropical fruit on Italian bread? Big Fruit, that's who. They've been slowly infiltrating our food supply for decades, starting with fruit cups in school lunches and now culminating in this pizza abomination.\n\nI've done my research. The pineapple pizza trend started in Hawaii—coincidentally, the same state that produces the most pineapples. Wake up, people! They're literally named after the state where the conspiracy began!\n\nNext thing you know, they'll be putting bananas in our hamburgers and mangoes in our tacos. Where does it end? When every meal is just a fruit salad with extra steps?\n\nWe must resist. Order your pizza with pepperoni, mushrooms, or even anchovies—anything but the tropical tyranny of pineapple. Our taste buds depend on it.",
    excerpt: "Deep dive into the fruity conspiracy threatening our beloved Italian cuisine.",
    tags: '["opinion", "pizza", "conspiracy", "fruit"]',
    fullWidth: false,
    author: "Tony Marinelli",
    url_slug: "pineapple-pizza-fruit-conspiracy",
    views: 28,
    featured: true
  }
];

// Helper functions to simulate database queries
export async function getStoriesByDate(date?: string): Promise<Story[]> {
  const targetDate = date || new Date().toISOString().split('T')[0];
  // return stories.filter(story => story.date === date);
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT * FROM stories WHERE date='${targetDate}'`
    );
    connection.releaseConnection;
    console.log('results: ', rows);
    return rows as Story[];
  } catch (error) {
    console.error('Database query error:', error);
    return [];
  }
}

export async function getStoriesBySection(section: string, date?: string): Promise<Story[]> {
  const targetDate = date || new Date().toISOString().split('T')[0];
  // return stories.filter(story => story.section === section && story.date === date);  
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT * FROM stories WHERE section='${section}' AND date='${targetDate}'`
    );
    connection.releaseConnection;
    return rows as Story[];
  } catch (error) {
    console.error('Database query error:', error);
    return [];
  }
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  // return stories.find(story => story.url_slug === slug);

  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT * FROM stories WHERE url_slug='${slug}'`
    );
    connection.releaseConnection;
    const results = rows as Story[];
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Database query error:', error);
    return null;
  }
}

export async function getFeaturedStories(date?: string): Promise<Story[]> {
  const targetDate = date || new Date().toISOString().split('T')[0];
  // return stories.filter(story => story.featured && story.date === date);
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT * FROM stories WHERE featured=TRUE AND date='${targetDate}'`
    );
    connection.releaseConnection;
    return rows as Story[];
  } catch (error) {
    console.error('Database query error:', error);
    return [];
  } 
}

export function getRandomStories(count: number, excludeId?: number): Story[] {
  const filtered = excludeId ? stories.filter(story => story.id !== excludeId) : stories;
  return filtered.sort(() => 0.5 - Math.random()).slice(0, count);
}

