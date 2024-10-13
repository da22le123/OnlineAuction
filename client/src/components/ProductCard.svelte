<script>
    import {onDestroy} from "svelte";
    import {calculateTimeRemaining} from "../utils/date-time.js"; // Import calculateTimeRemaining function
    import router from 'page'; // Import router from 'page'

    export let id;
    export let name;
    export let price;
    export let oldPrice;
    export let imageUrl;
    export let auctionEnd;

    let timeRemaining = '';

    function navigateToProductDetail() {
        router(`/laptops/${id}`); // Navigate to the product detail page
    }


    // Function to calculate time left till the auction ends


    // Set up a timer to update the countdown
    const interval = setInterval(() => {
        timeRemaining = calculateTimeRemaining(auctionEnd);
    }, 1000);

    // Clear interval when component is destroyed
    onDestroy(() => {
        clearInterval(interval);
    });

    const formatAuctionEnd = (auctionEnd) => {
        const date = new Date(auctionEnd);
        return date.toLocaleString();
    }
</script>

<main>
    <div class="product-card">
        <img src={imageUrl} alt={name} class="product-image" />
        <div class="product-info">
            <h3 class="product-name">{name}</h3>
            {#if oldPrice}
                <span class="old-price">{oldPrice}$</span>
            {/if}
            <span class="price">{price}$</span>
            <span class="auction-end">Ends in: {timeRemaining}</span>
            <button class="buy-button" on:click={navigateToProductDetail}>See more</button>
        </div>
    </div>
</main>

<style>
    .product-card {
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        margin: 16px;
        max-width: 300px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;
    }

    .product-card:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .product-image {
        width: 100%;
        height: auto;
        max-height: 200px;
        border-radius: 8px;
        margin-bottom: 16px;
    }

    .product-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .product-name {
        font-size: 1.25rem;
        margin-bottom: 8px;
    }

    .old-price {
        text-decoration: line-through;
        color: red;
        margin-right: 8px;
    }

    .price {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 16px;
    }

    .auction-end {
        margin-bottom: 16px;
        color: #888;
    }

    .buy-button {
        background-color: #6200ee;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .buy-button:hover {
        background-color: #3700b3;
    }
</style>