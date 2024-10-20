import express from "express";
import { handleRefreshToken } from "../controllers/refreshToken.js";

const router = express.Router();

router.route("/").get(handleRefreshToken);

export default router;
