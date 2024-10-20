import express from "express";
import { handleLogout } from "../controllers/logout";

const router = express.Router();

router.route("/").get(handleLogout);

export default router;
