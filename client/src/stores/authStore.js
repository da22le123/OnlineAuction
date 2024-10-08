import { writable } from 'svelte/store';

export const token = writable(null);  // Default to null (logged out)