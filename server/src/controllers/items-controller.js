import { createItem, getAllItems, getAllLaptops, getAllSneakers, findItemById, updateItem, deleteItem } from '../models/items-model.js';

// GET all items (laptops and sneakers)
export function getAllItemsController(req, res) {
    const items = getAllItems();  // Retrieve all items
    res.status(200).json(items);
}


// GET item by ID
export function getItemById(req, res) {
    const item = findItemById(Number(req.params.id));
    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
}

// POST create a new item (Laptop or Sneakers)
export function createNewItem(req, res) {
    try {
        const newItem = req.body;
        const itemId = createItem(newItem);  // Add new item
        res.status(201).json({ message: 'Item created successfully', id: itemId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// PUT update an item by ID
export function updateExistingItem(req, res) {
    try {
        const itemId = Number(req.params.id);
        const updateData = req.body;

        const result = updateItem(itemId, updateData);

        // Handle update results
        if (result === true) {
            res.status(200).json({ message: 'Item updated successfully' });
        } else if (result.message && result.message.includes("not found")) {
            res.status(404).json({ message: result.message });
        } else {
            res.status(400).json({ message: result.message }); // Handles validation errors and other cases
        }
    } catch (error) {
        // Catch unexpected errors and return a standard JSON error response
        res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
    }
}


// DELETE an item by ID
export function deleteExistingItem(req, res) {
    const result = deleteItem(Number(req.params.id));
    if (result) {
        res.status(200).json({ message: 'Item deleted successfully' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
}




