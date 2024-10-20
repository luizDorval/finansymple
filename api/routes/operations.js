import express from "express";
import {
  createOperation,
  deleteOperation,
  getOperation,
  getOperations,
  updateOperation,
} from "../controllers/operation.js";
import verifyJWT from "../middleware/verifyJWT.js";
import verifyRoles from "../middleware/verifyRoles.js";

const router = express.Router();

const allowUsrAdm = verifyRoles("usr", "adm");

router
  .route("/")
  .post(allowUsrAdm, createOperation)
  .get(allowUsrAdm, getOperations);

router
  .route("/:id")
  .get(allowUsrAdm, getOperation)
  .put(allowUsrAdm, updateOperation)
  .delete(allowUsrAdm, deleteOperation);

export default router;
