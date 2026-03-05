const db = require("../config/db");

//create blog
async function createBlog({
  id,
  authorId,
  title,
  topic,
  excerpt,
  content,
  coverImage, // Buffer or null
  status,
  publishedAt,
}) {
  await db.execute(
    `INSERT INTO blog
     (id, author_id, title,topic, excerpt, content, cover_image, status, published_at, created_at)
     VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, NOW())`,
    [
      id,
      authorId,
      title,
      topic,
      excerpt || null,
      content,
      coverImage || null,
      status,
      publishedAt || null,
    ],
  );

  return { id };
}

// returns lightweight list (no content)
async function getBlogsList({ includeDrafts = false } = {}) {
  const baseSelect = `
    SELECT
      id,
      author_id AS authorId,
      topic,
      title,
      excerpt,
      status,
      published_at AS publishedAt,
      created_at AS createdAt,
      cover_image IS NOT NULL AS hasCover
    FROM blog
  `;

  const where = includeDrafts ? "" : "WHERE status = 'PUBLISHED'";

  const order = `
    ORDER BY
      CASE WHEN status = 'PUBLISHED' THEN 0 ELSE 1 END,
      COALESCE(published_at, created_at) DESC
  `;

  const [rows] = await db.execute(`${baseSelect} ${where} ${order}`);
  return rows;
}

//delete blog
async function deleteBlogById(id) {
  const [result] = await db.execute("DELETE FROM blog WHERE id = ?", [id]);

  return result.affectedRows === 1;
}

// status should be "DRAFT" or "PUBLISHED" (you can add more later)
async function updateBlogStatus(id, status) {
  const [result] = await db.execute(
    "UPDATE blog SET status = ?, published_at = CASE WHEN ? = 'PUBLISHED' THEN NOW() ELSE NULL END WHERE id = ?",
    [status, status, id],
  );

  return result.affectedRows === 1;
}

//get cover image by id
async function getCoverById(id) {
  const [rows] = await db.execute("SELECT cover_image FROM blog WHERE id = ?", [
    id,
  ]);

  return rows[0] || null;
}

//get blog by id
async function getBlogById(id) {
  const [rows] = await db.execute(
    `
    SELECT 
      id,
      author_id,
      title,
      topic,
      excerpt,
      content,
      status,
      published_at,
      created_at,
      cover_image IS NOT NULL AS has_cover
    FROM blog
    WHERE id = ?
    `,
    [id],
  );

  return rows[0] || null;
}


module.exports = {
  getBlogsList,
  createBlog,
  deleteBlogById,
  updateBlogStatus,
  getBlogById,
  getCoverById,
};
