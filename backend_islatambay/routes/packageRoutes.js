import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  getPackage,
  addPackage,
  deletePackage,
} from "../controllers/packageContoller.js";

const router = express.Router();

router.get("/get-packages", upload.none(), getPackage);
router.post("/add-packages", upload.none(), addPackage);
router.delete("/delete-packages", upload.none(), deletePackage);

export default router;
