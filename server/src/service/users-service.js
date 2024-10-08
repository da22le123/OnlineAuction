import {getAllUsers} from "../models/user-model.js";

// Function to generate a new ID based on the lowest available or the next highest
export function generateNewId() {
    const allUsers = getAllUsers();

    if (allUsers.length === 0) {
        return 1;   // Return id 1 if there are no users
    }

    // Extract IDs from all users and sort them
    const existingIds = allUsers.map(user => user.id).sort((a, b) => a - b);

    // Check for the first missing ID in the sequence
    for (let i = 1; i <= existingIds.length; i++) {
        if (existingIds[i - 1] !== i) {
            return i;  // Return the first missing ID
        }
    }

    // If no IDs are missing, return the next highest ID
    return existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
}

export function validateUser(user) {
    const requiredFields = ['email', 'password', 'isAdmin'];
    for (const field of requiredFields) {
        if (user[field] === null || user[field] === undefined) {
            throw new Error(`Missing required field: ${field} for User`);
        }
    }

    const existingEmails = getAllUsers().map(user => user.email);

    if (!validateEmail(user.email, existingEmails)) {
        throw new Error('Invalid email address or already exists');
    }
    if (typeof user.password !== 'string' || user.password.length < 8) {
        throw new Error('Password must be a string with at least 8 characters');
    }
    if (typeof user.isAdmin !== 'boolean') {
        throw new Error('isAdmin must be a boolean value');
    }
}

export function validateEmail(email, existingEmails) {
    if (existingEmails.includes(email)) {
        return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}