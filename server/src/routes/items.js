import express from 'express';
import { getAllItemsController, getItemById, createNewItem, updateExistingItem, deleteExistingItem } from '../controllers/items-controller.js';

const router = express.Router();

// GET all items
router.get('/', getAllItemsController);

// GET an item by ID
router.get('/:id', getItemById);

// POST create a new item
router.post('/', createNewItem);

// PATCH update an existing item
router.put('/:id', updateExistingItem);

// DELETE an item by ID
router.delete('/:id', deleteExistingItem);



export default router;