<script>
    import ProductCard from './ProductCard.svelte';
    import Sidebar from "./Sidebar.svelte";
    import { searchQuery } from '../stores/searchStore';

    let products = [];
    let currentSearch = '';  // To hold the search query

    async function fetchProducts() {
        const queryParams = buildQueryParams(filters);
        const response = await fetch(
            `http://localhost:3000/items?${queryParams}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        let fetchedProducts = await response.json();

        const now = new Date();
        products = fetchedProducts.filter(product => new Date(product.auctionEnd) > now);

        console.log(products);
    }

    let filters = {
        name: [],
        processor: [],
        ram: [],
        storage: [],
        graphicsCard: []
    };

    function buildQueryParams(filters, searchQuery = '') {
        let queryParams = new URLSearchParams();

        // Iterate over the filters and add only selected ones to the query string
        Object.keys(filters).forEach(key => {
            if (filters[key] && filters[key].length > 0) {
                filters[key].forEach(value => {
                    queryParams.append(key, value);
                });
            }
        });

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
        filters = {
            ...filters,
            ...updatedFilters  // Update the specific filters that changed
        };

        fetchProducts();  // Refetch products when filters are updated
    }

    // Reset the search query by updating the search store
    searchQuery.set('');  // Clear the search query

    searchQuery.subscribe(value => {
        currentSearch = value;  // Update the search query
        fetchProducts();  // Refetch products when the search query changes
    });

    // Automatically refetch products when filters, or searchQuery changes
    $: fetchProducts();  // This will reactively run when filters or currentSearch change
</script>

<div class="product-container">
    <Sidebar {filters} on:filterChange={handleFilterChange}/>

    <div class="products-grid">
        {#each products as product (product.id)}
            <ProductCard
                    id={product.id}
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
    }
</style>
