// import jwt from 'jsonwebtoken';
import { token } from '../stores/authStore.js';

let tokenValue;

token.subscribe(value => {
    tokenValue = value;
});

export function getUserDataFromToken(token) {
    if (!token) {
        return null;
    }

    try {
        // Split the token to get the payload (second part of the token)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        // Parse the payload and return the user data (which should be inside the payload)
        const decodedPayload = JSON.parse(jsonPayload);

        return decodedPayload.user || decodedPayload;  // Assuming user data is stored under 'user' key
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}