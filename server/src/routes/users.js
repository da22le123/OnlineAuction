import express from "express";

import {getAllUsersController, createNewUser} from "../controllers/users-controller.js";

const router = express.Router();

// GET all users
router.get("/", getAllUsersController);

// POST create a new user
router.post("/", createNewUser);

export default router;