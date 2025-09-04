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

export async function getRandomStories(count: number, excludeId?: number): Promise<Story[]> {
  const targetDate = new Date().toISOString().split('T')[0];
  const filtered = excludeId ? `SELECT * FROM stories WHERE date='${targetDate} AND id NOT IN (${excludeId})'` : `SELECT * FROM stories WHERE date='${targetDate}'`;
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(filtered);
    connection.releaseConnection;
    return (rows as Story[]).sort(() => 0.5 - Math.random()).slice(0, count);
  } catch (error) {
    console.error('Database query error:', error);
    return [];
  }
}

