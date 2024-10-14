<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let filters;

    let minPrice = 50;
    let maxPrice = 4000;
    let selectedMinPrice = minPrice;
    let selectedMaxPrice = maxPrice;

    // Define filter options for laptops
    const laptopFilters = {
        name: ['Dell', 'Apple', 'Lenovo', 'HP', 'Acer', 'Asus', 'Microsoft', 'MSI', 'Samsung', 'Razer'],
        processor: ['Intel i5', 'Intel i7', 'AMD Ryzen 5', 'AMD Ryzen 7'],
        ram: ['8GB', '16GB', '32GB'],
        storage: ['SSD', 'HDD'],
        graphicsCard: ['Integrated', 'AMD', 'Nvidia']
    };

    // Handle filter change and emit an event to notify the parent
    function toggleFilter(type, value) {
        if (!filters[type]) {
            filters[type] = [];
        }

        const index = filters[type].indexOf(value);
        if (index === -1) {
            filters[type] = [...filters[type], value];
        } else {
            filters[type] = filters[type].filter(item => item !== value);
        }

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

    // Handle price change emitted by PriceSlider
    function handlePriceChange() {
        filters.price = { selectedMinPrice, selectedMaxPrice };  // Update the price filter in filters
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

    <div class="filters">
        <h4>Laptop Filters</h4>

        <label class="subcategory">Name</label>
        {#each laptopFilters.name as name}
            <div class="filter-option">
                <input type="checkbox" id={name} on:change={() => toggleFilter('name', name)}>
                <label for={name}>{name}</label>
            </div>
        {/each}

        <label class="subcategory">Processor</label>
        {#each laptopFilters.processor as processor}
            <div class="filter-option">
                <input type="checkbox" id={processor} on:change={() => toggleFilter('processor', processor)}>
                <label for={processor}>{processor}</label>
            </div>
        {/each}

        <label class="subcategory">RAM</label>
        {#each laptopFilters.ram as ram}
            <div class="filter-option">
                <input type="checkbox" id={ram} on:change={() => toggleFilter('ram', ram)}>
                <label for={ram}>{ram}</label>
            </div>
        {/each}

        <label class="subcategory">Storage</label>
        {#each laptopFilters.storage as storage}
            <div class="filter-option">
                <input type="checkbox" id={storage} on:change={() => toggleFilter('storage', storage)}>
                <label for={storage}>{storage}</label>
            </div>
        {/each}

        <label class="subcategory">Graphics Card</label>
        {#each laptopFilters.graphicsCard as card}
            <div class="filter-option">
                <input type="checkbox" id={card} on:change={() => toggleFilter('graphicsCard', card)}>
                <label for={card}>{card}</label>
            </div>
        {/each}
    </div>
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
