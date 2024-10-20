import express from "express";
import { handleRegister, handleLogin } from "../controllers/auth.js";

const router = express.Router();

router.route("/register").post(handleRegister);

router.route("/login").post(handleLogin);

export default router;
