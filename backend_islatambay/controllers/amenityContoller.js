import { pool } from "../config/db.js";
import { cloudinary } from "../config/cloudinary.js";

export const getAmenity = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM amenities");
    const amenities = result.rows;
    res.status(200).json(amenities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const addAmenity = async (req, res) => {
  const { title } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }
  const imageUrl = req.file.path;
  const public_id = req.file.filename;
  try {
    const result = await pool.query(
      "INSERT INTO amenities (title, image, public_id) VALUES ($1, $2, $3)",
      [title, imageUrl, public_id]
    );
    res.status(200).json({ message: `${title} is added` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteAmenity = async (req, res) => {
  const { id, title, public_id } = req.query;
  try {
    await cloudinary.uploader.destroy(public_id);
    const result = await pool.query("DELETE FROM amenities WHERE id = $1", [
      id,
    ]);
    res.status(200).json({ message: `${title} is successfully deleted` });
  } catch (error) {
    console.error(error);
  }
};
