import { pool } from "../config/db.js";
import { cloudinary } from "../config/cloudinary.js";

export const getHeroes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM heroes");
    const heroes = result.rows;
    res.status(200).json(heroes);
  } catch (error) {
    console.error(error);
  }
};

export const addHeroes = async (req, res) => {
  const { title, description } = req.body;
  console.log("File received:", req.file);
  console.log("Body received:", req.body);

  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded" });
  }

  const imageUrl = req.file.path || req.file.secure_url;
  const public_id = req.file.filename || req.file.public_id;

  try {
    const result = await pool.query(
      "INSERT INTO heroes (title, description, image, public_id) VALUES ($1, $2, $3, $4)",
      [title, description, imageUrl, public_id]
    );
    res.status(200).json({ message: `${title} is added successfully` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Error adding ${title}` });
  }
};

export const deleteHeroes = async (req, res) => {
  const { id, title, public_id } = req.query;

  try {
    await cloudinary.uploader.destroy(public_id);
    const result = await pool.query("DELETE FROM heroes WHERE id = $1", [id]);
    res.status(200).json({ message: `${title} is successfully deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
