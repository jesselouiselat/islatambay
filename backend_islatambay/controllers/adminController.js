import { pool } from "../config/db.js";

export const getAdminUsers = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE is_admin = true ORDER BY email ASC"
  );
  const adminUsers = result.rows;
  res.status(200).json(adminUsers);
};

export const promoteUser = async (req, res) => {
  const { targetEmail } = req.body;

  const checkResult = await pool.query("SELECT * FROM users WHERE email = $1", [
    targetEmail,
  ]);

  if (!checkResult) {
    return res.status(404).json({ message: "User not found." });
  }

  const result = checkResult.rows[0];
  if (result.is_admin == true) {
    return res
      .status(404)
      .json({ message: `${targetEmail} is already an admin` });
  }

  try {
    const update = await pool.query(
      "UPDATE users SET is_admin = true WHERE email = $1 RETURNING *",
      [targetEmail]
    );

    const user = update.rows[0];

    if (update.rowCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: `${targetEmail} is now an admin.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const removeAdmin = async (req, res) => {
  const { targetEmail } = req.body;

  if (targetEmail === "admin@email.com") {
    return res.status(401).json({ message: "Can't remove a main admin" });
  }

  const checkResult = await pool.query("SELECT * FROM users WHERE email = $1", [
    targetEmail,
  ]);

  if (!checkResult) {
    return res.status(404).json({ message: "User not found." });
  }

  const result = checkResult.rows[0];
  if (result.is_admin == false) {
    return res
      .status(404)
      .json({ message: `${targetEmail} is already a regular user` });
  }

  try {
    const update = await pool.query(
      "UPDATE users SET is_admin = false WHERE email = $1  RETURNING *",
      [targetEmail]
    );

    const user = update.rows[0];

    if (update.rowCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: `${targetEmail} is removed from Admin List.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
