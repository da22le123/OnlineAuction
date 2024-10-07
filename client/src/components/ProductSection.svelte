<script>
    import {onMount} from "svelte";
    import ProductCard from './ProductCard.svelte';
    import Sidebar from "./Sidebar.svelte";
    import { searchQuery } from '../stores/searchStore';

    let products = [];
    let currentSearch = '';  // To hold the search query

    async function fetchProducts() {
        const queryParams = buildQueryParams(filters);
        console.log(queryParams)
        const response = await fetch(
            `http://localhost:3000/items?${queryParams}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        products = await response.json();
        console.log(products);
    }

    let filters = {
        laptops: {
            name: [],
            processor: [],
            ram: [],
            storage: [],
            graphicsCard: []
        },
        sneakers: {
            size: [],
            color: []
        }
    };

    let category = 'laptops';

    // Call fetchProducts() when the component is mounted
    onMount(() => {
        fetchProducts();
    });

    function buildQueryParams(filters, searchQuery = '') {
        let queryParams = new URLSearchParams();

        // Add the selected category to the query string
        queryParams.append('category', category);

        // Ensure filters[category] exists
        if (filters[category]) {
            Object.keys(filters[category]).forEach(key => {
                // Only include the filter if there are selected values (i.e., not empty arrays)
                if (filters[category][key] && filters[category][key].length > 0) {
                    filters[category][key].forEach(value => {
                        queryParams.append(key, value);  // Add each selected value to the query
                    });
                }
            });
        }

        // Check if price filter exists and add min and max to the query
        if (filters.price) {
            queryParams.append('minPrice', filters.price.selectedMinPrice);
            queryParams.append('maxPrice', filters.price.selectedMaxPrice);
        }

        // Add the search query as 'like' if it exists
        if (currentSearch.trim() !== '') {
            queryParams.append('like', currentSearch);
        }

        return queryParams.toString();  // Return the query string
    }

    // Function to handle changes in filters coming from Sidebar
    function handleFilterChange(updatedFilters) {
        // Immutable update: Merge updatedFilters with the existing filters
        filters = {
            ...filters, // Preserve existing filters
            [category]: {
                ...filters[category], // Preserve existing filters for the current category
                ...updatedFilters[category]  // Only update the specific category that changed
            }
        };

        //console.log('Updated Filters in ProductSection:', filters); // Log updated filters
        fetchProducts();  // Refetch products when filters are updated
    }

    // Function to handle category change and reset filters
    function handleCategoryChange(event) {
        const newCategory = event.detail;  // Get the category from the event's detail field

        // Reset filters when the category changes
        filters = {
            ...filters,
            [newCategory]: {  // Reset the filters for the new category
                name: [],
                processor: [],
                ram: [],
                storage: [],
                graphicsCard: [],
                size: [],
                color: []
            }
        };

        category = newCategory;  // Update the category

        // console.log('Category changed to:', category); // Log the new category
        // console.log('Filters reset:', filters); // Log the reset filters

        fetchProducts();  // Fetch products for the new category with reset filters
    }

    // Reset the search query by updating the search store
    searchQuery.set('');  // Clear the search query

    searchQuery.subscribe(value => {
        currentSearch = value;  // Update the search query
        fetchProducts();  // Refetch products when the search query changes
    });
</script>

<div class="product-container">
    <Sidebar {category} {filters} on:filterChange={handleFilterChange} on:categoryChange={handleCategoryChange}/>

    <div class="products-grid">
        {#each products as product (product.id)}
            <ProductCard
                    name={product.name}
                    price={product.price}
                    oldPrice={product.bids.length > 1 ? product.bids[product.bids.length - 2].price : null}
                    imageUrl={product.imageUrl}
                    auctionEnd={product.auctionEnd}
            />
        {/each}
    </div>
</div>

<style>
    .product-container {
        display: flex;
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-auto-rows: minmax(100px, auto);
        gap: 20px;
        width: 100%;
        /*justify-content: space-between;*/
        /*align-items: stretch; !* Ensures each card has equal height *!*/
    }
</style>