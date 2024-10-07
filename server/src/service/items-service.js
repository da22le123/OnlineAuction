import {getAllItems} from "../models/items-model.js";

// Function to generate a new ID based on the lowest available or the next highest
export function generateNewId() {
    const allItems = getAllItems();

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

export function validateLaptop(item) {
    const requiredFields = ['auctionEnd', 'price', 'name', 'processor', 'ram', 'storage', 'graphicsCard'];
    for (const field of requiredFields) {
        if (!item[field]) {
            throw new Error(`Missing required field: ${field} for Laptop`);
        }
    }

    if (!isValidUrl(item.imageUrl)) {
        throw new Error('Invalid image URL for Laptop');
    }

    if (isNaN(Date.parse(item.auctionEnd))) {
        throw new Error('Invalid auctionEnd date');
    }
    if (typeof item.price !== 'number' || item.price <= 0) {
        throw new Error('Price must be a positive number');
    }
}

export function validateSneakers(item) {
    const requiredFields = ['auctionEnd', 'price', 'name', 'size', 'color'];
    for (const field of requiredFields) {
        if (!item[field]) {
            throw new Error(`Missing required field: ${field} for Sneakers`);
        }
    }

    if (!isValidUrl(item.imageUrl)) {
        throw new Error('Invalid image URL for Laptop');
    }

    if (isNaN(Date.parse(item.auctionEnd))) {
        throw new Error('Invalid auctionEnd date');
    }
    if (typeof item.price !== 'number' || item.price <= 0) {
        throw new Error('Price must be a positive number');
    }
    if (typeof item.size !== 'number' || item.size <= 0) {
        throw new Error('Size must be a positive number');
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