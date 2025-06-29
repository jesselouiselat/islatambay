import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import env from "dotenv";

env.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME_REPLACE,
  api_key: process.env.CLOUDINARY_API_KEY_REPLACE,
  api_secret: process.env.CLOUDINARY_API_SECRET_REPLACE,
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "islatambay",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export const upload = multer();
export const cloudUpload = multer({ storage });
export { cloudinary };
