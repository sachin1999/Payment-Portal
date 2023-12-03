import express from "express";
import { details, login } from "../controllers/loginController.js";

const router = express.Router();

router.post("/login", login);
router.post("/details", details);

export default router;