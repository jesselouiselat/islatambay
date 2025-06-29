import express from "express";
import {
  getAdminUsers,
  promoteUser,
  removeAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/get-admin-users", getAdminUsers);
router.post("/promote-user", promoteUser);
router.delete("/remove-admin", removeAdmin);

export default router;
