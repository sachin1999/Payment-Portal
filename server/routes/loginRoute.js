import express from "express";
import { details, login, logout } from "../controllers/loginController.js";

const router = express.Router();

router.post("/login", login);
router.post("/details", details);
router.post('/logout', logout)

export default router;
