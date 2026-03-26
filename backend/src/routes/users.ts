import { Router } from "express";
import * as usersController from "../controllers/users";

const router = Router();

// GET /users/all - Get all users
router.get("/all", usersController.getAllUsers);

// GET /users/:id - Get user by ID
router.get("/:id", usersController.getUserById);

// POST /users - Create a new user
router.post("/", usersController.createUser);

// PUT /users/:id - Update a user by ID
router.put("/:id", usersController.updateUserById);

// DELETE /users/:id - Delete a user by ID
router.delete("/:id", usersController.deleteUserById);

export default router;
