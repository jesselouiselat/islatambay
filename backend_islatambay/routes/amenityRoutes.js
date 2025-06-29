import express from "express";
import { cloudUpload } from "../config/cloudinary.js";
import {
  getAmenity,
  addAmenity,
  deleteAmenity,
} from "../controllers/amenityContoller.js";

const router = express.Router();

router.get("/get-amenities", getAmenity);
router.post("/add-amenities", cloudUpload.single("image"), addAmenity);
router.delete("/delete-amenities", deleteAmenity);

export default router;
