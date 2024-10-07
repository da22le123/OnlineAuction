<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let category;
    export let filters;


    let minPrice = 50;
    let maxPrice = 4000;
    let selectedMinPrice = minPrice;
    let selectedMaxPrice = maxPrice;


    const categories = ['laptops', 'sneakers'];

    // Define filter options
    const laptopFilters = {
        name: ['Dell', 'Apple', 'Lenovo', 'HP', 'Acer', 'Asus', 'Microsoft', 'MSI', 'Samsung', 'Razer'],
        processor: ['Intel i5', 'Intel i7', 'AMD Ryzen 5', 'AMD Ryzen 7'],
        ram: ['8GB', '16GB', '32GB'],
        storage: ['SSD', 'HDD'],
        graphicsCard: ['Integrated', 'AMD', 'Nvidia']
    };

    const sneakerFilters = {
        size: ['41', '42', '43', '44', '45'],
        color: ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow']
    };

    // Handle filter change and emit an event to notify the parent
    function toggleFilter(category, type, value) {
        // Ensure the category exists in filters (like 'laptops' or 'sneakers')
        if (!filters[category]) {
            console.log('filters[category] does not exist')
            filters[category] = {};  // Initialize category as an empty object if it doesn't exist
        }

        // Ensure the type (like 'name', 'processor') exists in filters[category]
        if (!filters[category][type]) {
            console.log('filters[category][type] does not exist');
            filters[category][type] = [];  // Initialize the type array if it doesn't exist
        }

        const index = filters[category][type].indexOf(value);
        if (index === -1) {
            filters[category][type] = [...filters[category][type], value]; // Add selected value
        } else {
            filters[category][type] = filters[category][type].filter(item => item !== value); // Remove unselected value
        }

        // console.log('Toggle filters: ', filters); // Log the updated filters

        //Filters ARE updated here
        dispatch('filterChange', filters);  // Emit the event to notify the parent about the filter change
    }

    function updateMinPrice(e) {
        const value = e.target.value;
        if (value > selectedMaxPrice) {
            selectedMinPrice = selectedMaxPrice;
        } else {
            selectedMinPrice = value;
        }
    }

    function updateMaxPrice(e) {
        const value = e.target.value;

        if (value < selectedMinPrice) {
            selectedMaxPrice = selectedMinPrice;
        } else {
            selectedMaxPrice = value;
        }
    }

    // Handle category change and emit an event to the parent
    function handleCategoryChange(event) {
        const newCategory = event.target.value;
        dispatch('categoryChange', newCategory);  // Emit the category change event
    }

    // Handle price change emitted by PriceSlider
    function handlePriceChange() {
        filters.price = { selectedMinPrice, selectedMaxPrice };  // Update the price filter in filters
        console.log(filters.price);
        dispatch('filterChange', filters);  // Emit the event to notify the parent
    }

</script>

<div class="sidebar">
    <!-- Price Range Filter -->
    <div class="price-filter">
        <label class="subcategory">Price</label>
        <div class="price-range">
            <input type="number" bind:value={selectedMinPrice} on:input={(e) => updateMinPrice(e)} min={minPrice} max={maxPrice} /> -
            <input type="number" bind:value={selectedMaxPrice} on:input={(e) => updateMaxPrice(e)} min={minPrice} max={maxPrice} />
            <button on:click={handlePriceChange}>OK</button>
        </div>
        <div class="slider-container">
            <input type="range" min={minPrice} max={maxPrice} bind:value={selectedMinPrice} on:input={(e) => updateMinPrice(e)} />
            <input type="range" min={minPrice} max={maxPrice} bind:value={selectedMaxPrice} on:input={(e) => updateMaxPrice(e)} />
        </div>
    </div>

    <h3>Filter by Category</h3>
    <select bind:value={category} on:change={handleCategoryChange}>
        {#each categories as category}
            <option value={category}>{category}</option>
        {/each}
    </select>

    {#if category === 'laptops'}
        <div class="filters">
            <h4>Laptops Filters</h4>

            <label class="subcategory">Name</label>
            {#each laptopFilters.name as name}
                <div class="filter-option">
                    <input type="checkbox" id={name} on:change={() => toggleFilter('laptops', 'name', name)}>
                    <label for={name}>{name}</label>
                </div>
            {/each}

            <label class="subcategory">Processor</label>
            {#each laptopFilters.processor as processor}
                <div class="filter-option">
                    <input type="checkbox" id={processor} on:change={() => toggleFilter('laptops', 'processor', processor)}>
                    <label for={processor}>{processor}</label>
                </div>
            {/each}

            <label class="subcategory">RAM</label>
            {#each laptopFilters.ram as ram}
                <div class="filter-option">
                    <input type="checkbox" id={ram} on:change={() => toggleFilter('laptops', 'ram', ram)}>
                    <label for={ram}>{ram}</label>
                </div>
            {/each}

            <label class="subcategory">Storage</label>
            {#each laptopFilters.storage as storage}
                <div class="filter-option">
                    <input type="checkbox" id={storage} on:change={() => toggleFilter('laptops', 'storage', storage)}>
                    <label for={storage}>{storage}</label>
                </div>
            {/each}

            <label class="subcategory">Graphics Card</label>
            {#each laptopFilters.graphicsCard as card}
                <div class="filter-option">
                    <input type="checkbox" id={card} on:change={() => toggleFilter('laptops', 'graphicsCard', card)}>
                    <label for={card}>{card}</label>
                </div>
            {/each}
        </div>
    {:else if category === 'sneakers'}
        <div class="filters">
            <h4>Sneakers Filters</h4>

            <label class="subcategory">Size</label>
            {#each sneakerFilters.size as size}
                <div class="filter-option">
                    <input type="checkbox" id={size} on:change={() => toggleFilter('sneakers', 'size', size)}>
                    <label for={size}>{size}</label>
                </div>
            {/each}

            <label class="subcategory">Color</label>
            {#each sneakerFilters.color as color}
                <div class="filter-option">
                    <input type="checkbox" id={color} on:change={() => toggleFilter('sneakers', 'color', color)}>
                    <label for={color}>{color}</label>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .sidebar {
        width: 300px;
        padding: 16px;
        background-color: #f4f4f4;
        border-right: 1px solid #ccc;
    }

    .filters {
        margin-top: 20px;
    }

    .subcategory {
        font-weight: bold;
        margin-top: 10px;
        display: block;
    }

    .filter-option {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    .filter-option input[type="checkbox"] {
        margin-right: 8px;
    }

    .price-filter {
        margin-bottom: 20px;
    }

    .price-range {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .price-range input[type="number"] {
        width: 80px;
        padding: 4px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .price-range button {
        padding: 4px 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #6200ee;
        color: white;
        cursor: pointer;
    }

    .price-range button:hover {
        background-color: #3700b3;
    }


    label {
        margin-top: 10px;
    }

    select {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
    }
</style>
