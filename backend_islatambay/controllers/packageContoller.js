import { pool } from "../config/db.js";

export const getPackage = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM packages");
    const packages = result.rows;
    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    res.json({ message: "Something went wrong" });
  }
};
export const addPackage = async (req, res) => {
  try {
    const { title, price, features } = req.body;
    const jsonString = JSON.stringify(features);
    const result = await pool.query(
      "INSERT INTO packages (title, price, features) VALUES ($1, $2, $3)",
      [title, price, jsonString]
    );
    res.status(200).json({ message: `${title} is successfully added.` });
  } catch (error) {
    console.error(error);
    res.json({ message: "Something went wrong" });
  }
};
export const deletePackage = async (req, res) => {
  const { title, id } = req.query;

  try {
    const result = await pool.query("DELETE FROM packages WHERE id = $1", [id]);
    res.status(200).json({ message: `Deleted ${title} successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
