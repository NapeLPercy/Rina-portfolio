const db = require("../config/db");

// Create / Insert
async function addDocument({ id, file, description,title }) {
  await db.execute(
    `INSERT INTO document (id, resume, description,title)
     VALUES (?, ?, ?, ?)`,
    [id, file.buffer, description,title]
  );

  return { id };
}

// Read one by id
async function getDocumentById(id) {
  const [rows] = await db.execute(
    `SELECT id, resume, title
     FROM document
     WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
}

// Delete a CV by id
   async function deleteCVById(id) {
    const query = `
      DELETE FROM document
      WHERE id = ?;
    `;
    const [ rows ] = await db.execute(query, [id]);
    console.log("in the server: ",rows);
    console.log("in the server 2: ",rows[0]);
    return rows?.affectedRows===1; // null => not found
  }

 // Fetch list of CVs (metadata only - no pdf bytea in list)
 async function getAllCVs() {
    const query = `
      SELECT
        id,
        description,
        title,
        is_main,
        updated_at
      FROM document;
    `;

    const [rows] = await db.execute(query);
    return rows || null;
  }


  // Set a CV as the "main" one
  // (we make sure only ONE is main)
async function setMainCV(id) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // unset current main
    await connection.execute(`
      UPDATE document
      SET is_main = 0
      WHERE is_main = 1;
    `);

    // set new main
    const [result] = await connection.execute(
      `
      UPDATE document
      SET is_main = 1
      WHERE id = ?;
      `,
      [id]
    );

    await connection.commit();

    return result.affectedRows === 1;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

// Get the main CV (PDF bytes + title)
async function getMainCV() {
  const [rows] = await db.execute(
    `
    SELECT id, title, resume
    FROM document
    WHERE is_main = 1
    LIMIT 1
    `,
  );

  return rows[0] || null;
}

  module.exports = {
  addDocument,
  getDocumentById,
  deleteCVById,
  getAllCVs,
  setMainCV,
  getMainCV,
};