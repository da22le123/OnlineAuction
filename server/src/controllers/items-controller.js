import {
    createItem,
    getAllItems,
    findItemById,
    updateItem,
    deleteItem,
    addBidToTheItem,
    getLatestBid,
    getWonItemsByUserId
} from '../model/items-model.js';

// GET all items
export function getAllItemsController(req, res) {
    const query = req.query;  // Retrieve query parameters

    // Retrieve minPrice and maxPrice from query parameters
    const minPrice = query.minPrice ? Number(query.minPrice) : 50;
    const maxPrice = query.maxPrice ? Number(query.maxPrice) : 4000;
    const {minPrice: __, maxPrice: ___, like, ...filters } = query;
    const items = getAllItems(filters, like, minPrice, maxPrice);  // Pass category, filters, min and max prices, and search query (like)
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

// POST create a new item
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

//POST a bid
export function addBid(req, res) {
    const itemId = Number(req.params.id);
    const bid = req.body;

    // Add bid to item
    const result = addBidToTheItem(itemId, bid);

    if (result === true) {
        res.status(200).json({ message: 'Bid added successfully' });
    } else {
        res.status(400).json({ result });
    }
}

export function streamBids(req, res) {
    const itemId = Number(req.params.id);

    // Set headers for SSE
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();  // Flush headers to establish SSE

    // Simulate pushing a new bid every 1 second
    const intervalId = setInterval(() => {
        const latestBid = getLatestBid(itemId);  // Get latest bid for the item
        if (latestBid) {
            res.write(`data: ${JSON.stringify(latestBid)}\n\n`);
        }
    }, 1000); // Every 1 second, send the latest bid

    // Close connection if the client disconnects
    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
}

export function getWonAuctions(req, res) {
    const userId = Number(req.params.userId);
    const items = getWonItemsByUserId(userId);  // Get all items where the winnerId is the user ID

    if (items.length > 0) {
        res.status(200).json(items);  // Return the won items
    } else {
        res.status(404).json({ message: 'No won auctions found for this user.' });
    }
}




