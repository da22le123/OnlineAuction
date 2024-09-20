<script>
    export let query = "";
    export let onSearch = (query) => {};

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            onSearch(query);
        }
    }
</script>

<div class="search-container">
    <input
            type="text"
            bind:value={query}
            placeholder="Searching for..."
            on:keypress={handleKeyPress}
    />
    <button on:click={() => onSearch(query)} aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                    d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"
            />
        </svg>
    </button>
</div>

<style>
    .search-container {
        display: flex;
        align-items: center;
        border: 1px solid #4791db;
        border-radius: 5px;
        padding: 5px 10px;
        max-width: 400px;
        flex: 1;
    }

    .search-container input {
        border: none;
        outline: none;
        font-size: 16px;
        color: #666;
        flex: 1;
    }

    .search-container input::placeholder {
        color: #aaa;
    }

    .search-container button {
        background: none;
        border: none;
        cursor: pointer;
    }

    .search-container button svg {
        width: 20px;
        height: 20px;
        fill: #4791db;
    }
</style>