import pool from "../config/db.js";

const User = {
  async findByUsername(username) {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return result.rows[0];
  },

  async create(username, hashedPassword) {
    const result = await pool.query(
      "INSERT INTO users (id, username, password) VALUES (gen_random_uuid(), $1, $2) RETURNING id, username",
      [username, hashedPassword]
    );
    return result.rows[0];
  }
};

export default User;
