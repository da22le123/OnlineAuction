import { writable } from 'svelte/store';

// Create a writable store to hold the current route
export const currentPath = writable('/');
