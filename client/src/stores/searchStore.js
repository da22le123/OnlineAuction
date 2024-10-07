import { writable } from 'svelte/store';

// Create a writable store to hold the search term
export const searchQuery = writable('');