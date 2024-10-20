import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/user.js";
import verifyRoles from "../middleware/verifyRoles.js";

const router = express.Router();

const allowUsr = verifyRoles("usr");

const allowAdm = verifyRoles("adm");

router
  .route("/")
  .get(allowUsr, getUsers)
  .put(allowUsr, updateUser)
  .post(allowAdm, createUser);

router
  .route("/:id")
  .get(allowAdm, getUser)
  .put(allowAdm, updateUser)
  .delete(allowAdm, deleteUser);

export default router;
