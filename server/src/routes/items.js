import express from 'express';
import { getAllItemsController, getItemById, createNewItem, updateExistingItem, deleteExistingItem } from '../controllers/items-controller.js';
import {isLoggedIn} from "../middleware/isLoggedIn.js";
import {isAdmin} from "../middleware/isAdmin.js";

const router = express.Router();

// GET all items
router.get('/', getAllItemsController);

// GET an item by ID
router.get('/:id', getItemById);

// POST create a new item, check if user is logged in and is admin
router.post('/',isLoggedIn, isAdmin, createNewItem);

// PATCH update an existing item, check if user is logged in and is admin
router.put('/:id',isLoggedIn, isAdmin, updateExistingItem);

// DELETE an item by ID, check if user is logged in and is admin
router.delete('/:id',isLoggedIn, isAdmin, deleteExistingItem);



export default router;