const db = require("../config/db"); // adjust path if yours is ../db or similar

async function getTotalBlogs() {
  const [rows] = await db.execute(`SELECT COUNT(*) AS total FROM blog`);
  return rows[0].total;
}

async function getTotalCVs() {
  const [rows] = await db.execute(`SELECT COUNT(*) AS totalCVs FROM document`);
  return rows[0].totalCVs;
}

async function getDraftedCount() {
  const [rows] = await db.execute(
    `SELECT COUNT(*) AS drafted FROM blog WHERE status = 'DRAFTED'`
  );
  return rows[0].drafted;
}

async function getPublishedCount() {
  const [rows] = await db.execute(
    `SELECT COUNT(*) AS published FROM blog WHERE status = 'PUBLISHED'`
  );
  return rows[0].published;
}

async function getDistinctTopicsCount() {
  const [rows] = await db.execute(
    `SELECT COUNT(DISTINCT topic) AS topics
     FROM blog
     WHERE topic IS NOT NULL AND TRIM(topic) <> ''`
  );
  return rows[0].topics;
}

async function getPublishedLast7DaysList() {
  const [rows] = await db.execute(
    `SELECT title, excerpt, published_at
     FROM blog
     WHERE status = 'PUBLISHED'
       AND published_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
     ORDER BY published_at DESC`
  );
  return rows;
}

async function getPublishedLast7DaysCount() {
  const [rows] = await db.execute(
    `SELECT COUNT(*) AS published_last_7_days
     FROM blog
     WHERE status = 'PUBLISHED'
       AND published_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`
  );
  return rows[0].published_last_7_days;
}

async function getLastResumeUpdatedAt() {
  // If you plan to store only 1 resume row, this still works.
  const [rows] = await db.execute(
    `SELECT MAX(updated_at) AS last_resume_updated_at FROM document`
  );
  return rows[0].last_resume_updated_at; // can be null if no rows yet
}

module.exports = {
  getTotalBlogs,
  getTotalCVs,
  getDraftedCount,
  getPublishedCount,
  getDistinctTopicsCount,
  getPublishedLast7DaysList,
  getPublishedLast7DaysCount,
  getLastResumeUpdatedAt,
};