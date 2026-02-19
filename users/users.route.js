import { Router } from "express";
import { handleCreateUser, handleUpdateUser } from "./user.controller.js";
import { handleListUsers } from "./user.controller.js";
import { handleGetUserById } from "./user.controller.js";
import { handleDeleteUser } from "./user.controller.js";

const router = Router();

router.post("/", handleCreateUser);
router.get("/", handleListUsers);
router.get("/:id", handleGetUserById);
router.delete("/:id", handleDeleteUser);
router.patch("/:id", handleUpdateUser);
export default router;
