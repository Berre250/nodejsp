import { Router } from "express";
import { handleCreateUser, handleUpdateUser } from "./user.controller.js";
import { handleListUsers } from "./user.controller.js";
import { handleGetUserById } from "./user.controller.js";
import {
  handleDeleteUser,
  handleSearchUsers,
  handleCountUsers,
  handleUpdatePassword,
} from "./user.controller.js";

const router = Router();

router.post("/", handleCreateUser);
router.get("/", handleListUsers);
router.get("/count", handleCountUsers);
router.get("/search", handleSearchUsers);
router.delete("/:id", handleDeleteUser);
router.patch("/:id", handleUpdateUser);
router.patch("/:id/password", handleUpdatePassword);
router.get("/:id", handleGetUserById);

export default router;
