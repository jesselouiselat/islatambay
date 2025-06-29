import express from "express";
import { upload, cloudUpload } from "../config/cloudinary.js";
import {
  getHeroes,
  addHeroes,
  deleteHeroes,
} from "../controllers/heroController.js";

const router = express.Router();

router.get("/get-heroes", getHeroes);
router.post("/add-heroes", cloudUpload.single("image"), addHeroes);
router.delete("/delete-heroes", deleteHeroes);

export default router;
