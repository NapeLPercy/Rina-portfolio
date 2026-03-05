const db = require("../config/db");

async function findByUsername(username) {
  const [rows] = await db.execute(
    "SELECT id, username, email, role, password FROM user WHERE username = ? LIMIT 1",
    [username],
  );
  return rows[0] || null;
}

async function createUser({ id, username, email, role, passwordHash }) {
  await db.execute(
    "INSERT INTO user (id, username, email, role, password) VALUES (?, ?, ?, ?, ?)",
    [id, username, email, role, passwordHash],
  );
  return { id, username, email, role };
}

async function findUserEmail(email) {
  const [rows] = await db.execute("SELECT email FROM user WHERE email = ?", [
    email,
  ]);
  return rows[0] || null;
}

// Save or update reset code
async function saveCode(id,email, code, expiresAt) {
  const query = `
      INSERT INTO password_reset_codes (id,email, code, expires_at)
      VALUES (?,?,?,?);
    `;

  const values = [id,email, code, expiresAt];

  const { rows } = await db.execute(query, values);
  return true;
}


// Get valid (non-expired) reset code
async function getValidCode(email) {
  const query = `
      SELECT *
      FROM password_reset_codes
      WHERE email = ?
      AND expires_at > NOW()
      LIMIT 1;
    `;

  const [ rows ] = await db.execute(query, [email]);
  return rows[0] || null;
}

// Delete reset code (after success)
async function deleteCode(email) {
  const query = `
      DELETE FROM password_reset_codes
      WHERE email = ?;
    `;

  const [ rows ] = await db.execute(query, [email]);
  return rows[0] || null;
}

// Optional: Clean up expired codes (can run via cron job)
async function deleteExpiredCodes() {
  const query = `
      DELETE FROM password_reset_codes
      WHERE expires_at <= NOW();
    `;

  await db.execute(query);
}

//change password and username
async function updateCredentials(
  email,
  newUsername,
  newPasswordHash,
  date,
) {
  await db.execute(
    "UPDATE user SET username = ?, password = ?, updated_at = ? WHERE email = ?",
    [newUsername, newPasswordHash,date, email],
  );

  return true;
}

module.exports = {
  findByUsername,
  createUser,
  findUserEmail,
  saveCode,
  getValidCode,
  deleteCode,
  updateCredentials,
};
