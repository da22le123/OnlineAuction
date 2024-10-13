import {generateNewId, validateBid, validateLaptop, validateSneakers} from "../service/items-service.js";
export let laptops = [
    {
        id: 1,
        bids: [
            {
                timestamp: "2024-08-08T11:00",
                price: 1300,
                user: 1
            },
            {
                timestamp: "2024-08-08T12:00",
                price: 1500,
                user: 1
            }
        ],
        imageUrl: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/9345/media-gallery/touch/gray/notebook-xps-13-9345-t-gray-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=679&qlt=100,1&resMode=sharp2&size=679,402&chrss=full",
        auctionEnd: "2024-10-20T16:30",
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
        bids: [
            {
                timestamp: "",
                price: 1200,
                user: 1
            }
        ],
        imageUrl: "https://sg-files.apjonlinecdn.com/landingpages/category-family/hp-laptops-family/images/w100_hero_mobile_v2.jpg",
        auctionEnd: "2024-10-20T15:30",
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
        bids: [
            {
                timestamp: "",
                price: 1300,
                user: 1
            }
        ],
        imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1708367688034",
        auctionEnd: "2024-10-20T15:30",
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
        bids: [
            {
                timestamp: "",
                price: 1400,
                user: 1
            }
        ],
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvwiAhqTEXWzMYQnrbPXxgHG5QHdt23Yrpyw&s",
        auctionEnd: "2024-10-20T15:30",
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
        bids: [
            {
                timestamp: "",
                price: 1250,
                user: 1
            }
        ],
        imageUrl: "https://www.asus.com/media/Odin/Websites/global/Series/15.png",
        auctionEnd: "2024-10-20T15:30",
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
        bids: [
            {
                timestamp: "",
                price: 1350,
                user: 1
            }
        ],
        imageUrl: "https://media.s-bol.com/Ny1o1AmGm30m/MY0Rm1/1200x844.jpg",
        auctionEnd: "2024-10-20T15:30",
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
        bids: [
            {
                timestamp: "",
                price: 1470,
                user: 1
            }
        ],
        imageUrl: "https://www.notebookcheck.nl/uploads/tx_nbc2/Surface_Laptop_4_13.jpg",
        auctionEnd: "2024-10-20T15:30",
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
        bids: [
            {
                timestamp: "",
                price: 1000,
                user: 1
            }
        ],
        imageUrl: "https://i5.walmartimages.com/seo/MSI-GL63-Gaming-Laptop-15-6-Intel-Core-i7-8750H-NVIDIA-GeForce-GTX-1050-8gb-RAM-256gb-SSD-1TB-HDD_3a04f0fc-6fed-4b52-912c-11317e493ad1_1.9e46d617254b76bff5a4cda944922f78.jpeg",
        auctionEnd: "2024-10-20T15:30",
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
        bids: [
            {
                timestamp: "",
                price: 980,
                user: 1
            }
        ],
        imageUrl: "https://img.informatique.nl/750/24748501.jpg",
        auctionEnd: "2024-10-20T15:30",
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
        bids: [
            {
                timestamp: "",
                price: 1510,
                user: 1
            }
        ],
        imageUrl: "https://www.notebookcheck.nl/uploads/tx_nbc2/Blade_15_Fall_2018_Base_Model_Render_13.png",
        auctionEnd: "2024-10-20T15:30",
        price: 1510,
        type: "Laptop",
        name: "Razer",
        processor: "Intel i9",
        ram: "32GB",
        storage: "SSD",
        graphicsCard: "Nvidia"
    },
    {
        id: 13,
        bids: [
            {
                timestamp: "2024-08-20T10:00",
                price: 1200,
                user: 1
            },
            {
                timestamp: "2024-08-21T12:00",
                price: 1300,
                user: 1
            }
        ],
        imageUrl: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06375981.png",
        auctionEnd: "2024-10-30T15:00",
        price: 1300,
        type: "Laptop",
        name: "HP",
        processor: "Intel i7",
        ram: "16GB",
        storage: "SSD",
        graphicsCard: "Integrated"
    },
    {
        id: 14,
        bids: [
            {
                timestamp: "2024-08-18T09:30",
                price: 1400,
                user: 1
            },
            {
                timestamp: "2024-08-19T11:00",
                price: 1550,
                user: 1
            }
        ],
        imageUrl: "https://img.global.news.samsung.com/global/wp-content/uploads/2017/01/PressRelease_Notebook9_Main_1.jpg",
        auctionEnd: "2024-10-02T14:00:00Z",
        price: 1550,
        type: "Laptop",
        name: "Samsung",
        processor: "Intel i9",
        ram: "32GB",
        storage: "SSD",
        graphicsCard: "Nvidia"
    },
    {
        id: 15,
        bids: [
            {
                timestamp: "2024-08-15T13:00",
                price: 1100,
                user: 1
            },
            {
                timestamp: "2024-08-17T15:30",
                price: 1200,
                user: 1
            }
        ],
        imageUrl: "https://m.media-amazon.com/images/I/61FETFgD3hL.jpg",
        auctionEnd: "2024-10-28T16:00",
        price: 1200,
        type: "Laptop",
        name: "Acer",
        processor: "AMD Ryzen 7",
        ram: "16GB",
        storage: "HDD",
        graphicsCard: "AMD"
    },
    {
        id: 16,
        bids: [
            {
                timestamp: "2024-08-13T08:00",
                price: 950,
                user: 1
            },
            {
                timestamp: "2024-08-14T11:00",
                price: 1050,
                user: 1
            }
        ],
        imageUrl: "https://www.notebookcheck.nl/fileadmin/Notebooks/Lenovo/ThinkPad_E16_G1_21JUS08X00/IMG_0312.JPG",
        auctionEnd: "2024-10-19T12:00",
        price: 1050,
        type: "Laptop",
        name: "Lenovo",
        processor: "Intel i5",
        ram: "8GB",
        storage: "SSD",
        graphicsCard: "Integrated"
    },
    {
        id: 17,
        bids: [
            {
                timestamp: "2024-08-12T07:00",
                price: 1750,
                user: 1
            },
            {
                timestamp: "2024-08-14T09:00",
                price: 1850,
                user: 1
            }
        ],
        imageUrl: "https://http2.mlstatic.com/D_NQ_NP_797680-MLA51356381245_082022-O.webp",
        auctionEnd: "2024-10-18T18:00",
        price: 1850,
        type: "Laptop",
        name: "Apple",
        processor: "Apple M2",
        ram: "32GB",
        storage: "SSD",
        graphicsCard: "Integrated"
    },
    {
        id: 18,
        bids: [
            {
                timestamp: "2024-08-11T12:30",
                price: 1450,
                user: 1
            },
            {
                timestamp: "2024-08-13T13:30",
                price: 1600,
                user: 1
            }
        ],
        imageUrl: "https://i.dell.com/is/image/DellContent/content/dam/ss2/products/laptops-and-2-in-1s/latitude/13-9330-touch/media-gallery/2in1/notebook-latitude-13-9330-gray-gallery-8.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=625&qlt=100,1&resMode=sharp2&size=625,402&chrss=full",
        auctionEnd: "2024-10-22T17:00",
        price: 1600,
        type: "Laptop",
        name: "Dell",
        processor: "Intel i7",
        ram: "16GB",
        storage: "SSD",
        graphicsCard: "Nvidia"
    },
    {
        id: 19,
        bids: [
            {
                timestamp: "2024-08-09T08:00",
                price: 1350,
                user: 1
            },
            {
                timestamp: "2024-08-10T10:30",
                price: 1450,
                user: 1
            }
        ],
        imageUrl: "https://laptopmedia.com/wp-content/uploads/2021/01/Acer-Aspire-3_A317-52_05-e1610455525412.jpg",
        auctionEnd: "2024-10-25T19:30",
        price: 1450,
        type: "Laptop",
        name: "Acer",
        processor: "Intel i5",
        ram: "8GB",
        storage: "SSD",
        graphicsCard: "Integrated"
    },
    {
        id: 20,
        bids: [
            {
                timestamp: "2024-08-08T11:00",
                price: 1600,
                user: 1
            },
            {
                timestamp: "2024-08-09T15:00",
                price: 1700,
                user: 1
            }
        ],
        imageUrl: "https://dlcdnwebimgs.asus.com/gain/be4de3c3-e364-4b45-b40b-ec4ec50e0c2b/",
        auctionEnd: "2024-10-15T13:00",
        price: 1700,
        type: "Laptop",
        name: "Asus",
        processor: "Intel i9",
        ram: "32GB",
        storage: "SSD",
        graphicsCard: "Nvidia"
    }
];

export let sneakers = [
{
    id: 11,
    bids: [
        {
            timestamp: "",
            price: 120,
            user: ""
        }
    ],
    imageUrl: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/ed95a1f5-5f45-45c1-9a0d-6aed6e0a7cd9/NIKE+AIR+MAX+1.png",
    auctionEnd: "2024-10-20T15:30",
    price: 120,
    type: "Sneakers",
    name: "Nike Air",
    size: 42,
    color: "White"
},
{
    id: 12,
    bids: [
        {
            timestamp: "",
            price: 130,
            user: ""
        }
    ],
    imageUrl: "https://pirri.nl/cdn/shop/files/adidas-campus-00s-core-black-adidas-campus-pirri.webp?v=1707683715",
    auctionEnd: "2024-10-20T15:30",
    price: 140,
    type: "Sneakers",
    name: "Adidas Campus",
    size: 43,
    color: "Black"
}
];

export function createItem(item) {
    // Generate a new unique ID across both laptops and sneakers


    const itemId = generateNewId();
    let itemObj = {
    };
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
            graphicsCard: item.graphicsCard,
            imageUrl: item.imageUrl // Added imageUrl
        };

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
            color: item.size,
            imageUrl: item.imageUrl // Added imageUrl
        };

        validateSneakers(itemObj);  // Validate fields for Sneakers
        sneakers.push(itemObj);     // Add the item to the sneakers array
        return itemId;             // Return new item's id if successfully added
    }

    throw new Error("Unsupported item type");
}

export function getAllItems(category, filters, like = '', minPrice = 50, maxPrice = 4000) {
    let items;

    // Filter based on category
    if (category==='laptops') {
        items = [...laptops];
    } else if (category==='sneakers') {
        items = [...sneakers];
    } else{
        items = [...laptops, ...sneakers]
    }

    // If no filters and no search query (like) are provided, return all items in the category
    if (Object.keys(filters).length === 0 && !like && minPrice === 50 && maxPrice === 4000) {
        return items;
    }

    // Apply price filter
    items = items.filter(item => item.price >= minPrice && item.price <= maxPrice);


    // Apply filters
    items = items.filter(item => {
        // Iterate through each filter in the query
        return Object.keys(filters).every(key => {
            // Handle the case where multiple values are passed (e.g., name=Dell&name=HP)
            const filterValues = Array.isArray(filters[key]) ? filters[key] : [filters[key]];

            // Convert string to number for the 'size' filter if needed
            if (key === 'size') {
                return filterValues.map(Number).includes(item[key]);  // Convert to number and compare
            }

            // Match item[key] with any of the filterValues (OR condition for multiple values)
            return filterValues.includes(item[key]);
        });
    });

    // Apply search query (like) if provided
    if (like) {
        items = items.filter(item =>
            item.name.toLowerCase().includes(like.toLowerCase())  // Substring match on name (case-insensitive)
        );
    }

    return items;  // Return the filtered items
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
    console.log("deleteItem() in items-model.js called with id:", id);
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
    return [...laptops].find(item => item.id === Number(id)) || null;
}

// Update the item in the correct array
export function updateItem(id, updateData) {
    const item = findItemById(id);

    if (!item) {
        return { message: `Item with ID ${id} not found.` };
    }

    // Validate the incoming updateData based on its type
    try {
        validateLaptop(updateData); // Validate as Laptop
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

export function addBidToTheItem(itemId, bid) {
    const item = findItemById(itemId);
    if (!item) {
        return { message: `Item with ID ${itemId} not found.` };
    }

    // Validate the bid
    try {
        validateBid(bid);
    } catch (e) {
        return { message: e.message };
    }

    // Add the bid to the item
    item.bids.push(bid);
    item.price = bid.price;  // Update the price of the item

    return true;
}

export function getLatestBid(productId) {
    const item = findItemById(productId);  //get the item based on the id
    const bids = item.bids;

    if (bids.length === 0) {
        return null;  // No bids found
    }

    return bids[bids.length - 1];  // Return the last bid (latest bid)
}

