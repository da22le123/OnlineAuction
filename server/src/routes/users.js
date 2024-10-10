import express from "express";

import {getAllUsersController, createNewUser, getUserById} from "../controllers/users-controller.js";

const router = express.Router();

// GET all users
router.get("/", getAllUsersController);

// GET user by ID
router.get("/:id", getUserById);

// POST create a new user
router.post("/", createNewUser);

export default router;