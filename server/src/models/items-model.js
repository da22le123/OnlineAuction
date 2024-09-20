import {generateNewId, validateLaptop, validateSneakers} from "../service/items-service.js"
export let laptops = [
    {
        id: 1,
        bids: [],
        auctionEnd: "2024-09-20T15:30:00Z",
        price: 1500,
        type: "Laptop",
        name: "Dell",
        processor: "Intel i5",
        ram: "8GB",
        storage: "SSD",
        graphicsCard: "Integrated"
    },
    {
        id: 2,
        bids: [],
        auctionEnd: "2024-09-20T15:30:00Z",
        price: 1200,
        type: "Laptop",
        name: "HP",
        processor: "AMD Ryzen 7",
        ram: "16GB",
        storage: "HDD",
        graphicsCard: "AMD"
    },
    {
        id: 3,
        bids: [],
        auctionEnd: "2024-09-20T15:30:00Z",
        price: 1300,
        type: "Laptop",
        name: "Apple",
        processor: "Apple M1",
        ram: "8GB",
        storage: "SSD",
        graphicsCard: "Integrated"
    },
    {
        id: 4,
        bids: [],
        auctionEnd: "2024-09-20T15:30:00Z",
        price: 1400,
        type: "Laptop",
        name: "Lenovo",
        processor: "Intel i7",
        ram: "32GB",
        storage: "SSD",
        graphicsCard: "Nvidia"
    },
    {
        id: 5,
        bids: [],
        auctionEnd: "2024-09-20T15:30:00Z",
        price: 1250,
        type: "Laptop",
        name: "Asus",
        processor: "Intel i9",
        ram: "16GB",
        storage: "SSD",
        graphicsCard: "Nvidia"
    },
    {
        id: 6,
        bids: [],
        auctionEnd: "2024-09-20T15:30:00Z",
        price: 1350,
        type: "Laptop",
        name: "Acer",
        processor: "AMD Ryzen 5",
        ram: "8GB",
        storage: "HDD",
        graphicsCard: "AMD"
    },
    {
        id: 7,
        bids: [],
        auctionEnd: "2024-09-20T15:30:00Z",
        price: 1470,
        type: "Laptop",
        name: "Microsoft",
        processor: "Intel i5",
        ram: "16GB",
        storage: "SSD",
        graphicsCard: "Integrated"
    },
    {
        id: 8,
        bids: [],
        auctionEnd: "2024-09-20T15:30:00Z",
        price: 1000,
        type: "Laptop",
        name: "MSI",
        processor: "Intel i7",
        ram: "16GB",
        storage: "SSD",
        graphicsCard: "Nvidia"
    },
    {
        id: 9,
        bids: [],
        auctionEnd: "2024-09-20T15:30:00Z",
        price: 980,
        type: "Laptop",
        name: "Samsung",
        processor: "AMD Ryzen 9",
        ram: "32GB",
        storage: "SSD",
        graphicsCard: "AMD"
    },
    {
        id: 10,
        bids: [],
        auctionEnd: "2024-09-20T15:30:00Z",
        price: 1510,
        type: "Laptop",
        name: "Razer",
        processor: "Intel i9",
        ram: "32GB",
        storage: "SSD",
        graphicsCard: "Nvidia"
    }

];

export let sneakers = [
{
    id: 11,
    bids: [],
    auctionEnd: "2024-09-20T15:30:00Z",
    price: 120,
    type: "Sneakers",
    name: "Nike Air",
    size: 42,
    color: "Yellow"
},
{
    id: 12,
    bids: [],
    auctionEnd: "2024-09-20T15:30:00Z",
    price: 140,
    type: "Sneakers",
    name: "Adidas Campus",
    size: 42,
    color: "Yellow"
}
];

export function createItem(item) {
    // Generate a new unique ID across both laptops and sneakers


    let itemId = generateNewId(laptops, sneakers);
    let itemObj = {
    }
    console.log('Received item:', item); // Log the incoming item

    if (item.type === "Laptop") {
        itemObj = {
            id: itemId,
            bids: [],
            auctionEnd: item.auctionEnd,
            price: item.price,
            type: item.type,
            name: item.name,
            processor: item.processor,
            ram: item.ram,
            storage: item.storage,
            graphicsCard: item.graphicsCard
        }

        validateLaptop(itemObj);  // Validate fields for Laptop
        laptops.push(itemObj);    // Add the item to the laptops array
        return itemId;           // Return new item's id if successfully added
    } else if (item.type === "Sneakers") {
        itemObj = {
            id: itemId,
            bids: [],
            auctionEnd: item.auctionEnd,
            price: item.price,
            type: item.type,
            name: item.name,
            size: item.size,
            color: item.size
        }

        validateSneakers(itemObj);  // Validate fields for Sneakers
        sneakers.push(itemObj);     // Add the item to the sneakers array
        return itemId;             // Return new item's id if successfully added
    }

    throw new Error("Unsupported item type");
}

export function getAllItems() {
    return [...laptops, ...sneakers]; //returns both laptops and sneakers
}

//returns all the laptops
export function getAllLaptops(){
    return laptops;
}

//returns all the sneakers
export function getAllSneakers(){
    return sneakers;
}

// Function returns false, meaning no item was found and deleted.
// If the item exists, it filters the array to remove it, then returns
// true to indicate the item was successfully deleted.
export function deleteItem(id) {
    const foundItem = findItemById(id);  // Check if the item exists

    if (foundItem === null) {
        return false;  // Item not found, return false
    }

    if (foundItem.type === "Laptop") {
        laptops = laptops.filter(item => item.id !== id);  // Filter out the laptop
    } else if (foundItem.type === "Sneaker") {
        sneakers = sneakers.filter(item => item.id !== id);  // Filter out the sneaker
    }

    return true;  // Item found and deleted, return true
}


// returns the found item or null if not found
export function findItemById(id) {
    return getAllItems().find(item => item.id === Number(id)) || null;
}

// Update the item in the correct array
export function updateItem(id, updateData) {
    const item = findItemById(id);

    if (!item) {
        return { message: `Item with ID ${id} not found.` };
    }

    // Validate the incoming updateData based on its type
    try {
        // Validate updateData by checking its type
        if (updateData.type === 'Laptop') {
            validateLaptop(updateData); // Validate as Laptop
        } else if (updateData.type === 'Sneakers') {
            validateSneakers(updateData); // Validate as Sneakers
        } else {
            // Return an error if the type in updateData is invalid
            return { message: 'Invalid item type in the submitted data.' };
        }
    } catch (error) {
        // Return validation error message without modifying the existing item
        return { message: error.message };
    }

    // Determine the array: is the item a laptop or sneaker?
    const itemArray = item.type === 'Laptop' ? laptops : item.type === 'Sneakers' ? sneakers : null;

    // Find the index of the item in the correct array
    const itemIndex = itemArray.findIndex(existingItem => existingItem.id === id);

    if (itemIndex === -1) {
        return { message: `Item with ID ${id} not found in its array.` };
    }

    // Merge updateData into the existing item only after successful validation
    Object.assign(item, updateData);

    // Update the item in the correct array
    itemArray[itemIndex] = item;

    // Return true if successfully updated
    return true;
}

