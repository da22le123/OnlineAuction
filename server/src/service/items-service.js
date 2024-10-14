import {getAllItems} from "../models/items-model.js";

// Function to generate a new ID based on the lowest available or the next highest
export function generateNewId() {
    const allItems = getAllItems('all', {});

    // Extract IDs from all items and sort them
    const existingIds = allItems.map(item => item.id).sort((a, b) => a - b);

    // Check for the first missing ID in the sequence
    for (let i = 1; i <= existingIds.length; i++) {
        if (existingIds[i - 1] !== i) {
            return i;  // Return the first missing ID
        }
    }

    // If no IDs are missing, return the next highest ID
    return existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
}

export function validateItem(item) {
    const requiredFields = ['auctionEnd', 'price', 'name', 'processor', 'ram', 'storage', 'graphicsCard'];
    for (const field of requiredFields) {
        if (!item[field]) {
            throw new Error(`Missing required field: ${field} for item`);
        }
    }
    if (item.imageUrl) {
        if (!isValidUrl(item.imageUrl)) {
            throw new Error('Invalid image URL for Laptop');
        }
    }

    if (isNaN(Date.parse(item.auctionEnd))) {
        throw new Error('Invalid auctionEnd date');
    }
    if (typeof item.price !== 'number' || item.price <= 0) {
        throw new Error('Price must be a positive number');
    }
}

// Helper function to validate URLs
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

export function validateBid(bid) {
    const requiredFields = ['timestamp', 'price', 'user'];

    for (const field of requiredFields) {
        if (!bid[field]) {
            throw new Error(`Missing required field: ${field} for bid`);
        }
    }

    if (typeof bid.price !== 'number' || isNaN(bid.price) || bid.price <= 0) {
        throw new Error("Bid price must be a positive number.");
    }


}