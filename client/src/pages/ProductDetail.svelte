<script>
    import {calculateTimeRemaining} from "../utils/countdown.js";

    export let params;  // Declare 'params' as a prop
    const productId = params.id;  // Get the product ID from the URL params

    let newBidAmount = 0;  // To hold the new bid amount
    let timeRemaining = '';  // To hold the countdown string

    async function fetchProductById() {
        const response = await fetch(
            `http://localhost:3000/items/${productId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = await response.json();

        const interval = setInterval(() => {
            timeRemaining = calculateTimeRemaining(data.auctionEnd);
        }, 1000);

        return data;
    }

    async function fetchUserById(userId) {
        const response = await fetch(
            `http://localhost:3000/users/${userId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = await response.json();
        return data;
    }

    // async function postBid() {
    //
    // }

    // Function to place a new bid
    function placeBid(product) {
        console.log("Test: set new bid amount", newBidAmount, " for product ", product.name);
    }

    function trimUsername(email) {
        return email.split('@')[0];
    }

    // Set up a timer to update the countdown



</script>



<main class="product-detail-layout">
    {#await fetchProductById() then product}
        <div class="left-section">
            <img src={product.imageUrl} alt={product.name} class="product-image" />
            <table class="product-info-table">
                <tr>
                    <th>Name</th>
                    <td>{product.name}</td>
                </tr>
                <tr>
                    <th>Processor</th>
                    <td>{product.processor}</td>
                </tr>
                <tr>
                    <th>RAM</th>
                    <td>{product.ram}</td>
                </tr>
                <tr>
                    <th>Storage</th>
                    <td>{product.storage}</td>
                </tr>
                <tr>
                    <th>Graphics Card</th>
                    <td>{product.graphicsCard}</td>
                </tr>
                <tr>
                    <th>Auction Ends</th>
                    <td>{new Date(product.auctionEnd).toLocaleString()}</td>
                </tr>
                <tr>
                    <th>Time Left</th>
                    <td class="countdown">{timeRemaining}</td>
                </tr>
            </table>
        </div>

        <div class="right-section">
            <h3>Bids</h3>
            <h5 style="font-family: 'Times New Roman'; font-style: italic;">Currently winning bid has green background.</h5>
            <div class="bids-container">
                <ul>
                    {#each product.bids.slice().reverse() as bid, index}
                        {#await fetchUserById(bid.user)}
                            <li>Loading...</li>
                        {:then user}
                            <li style="background-color: {index === 0 ? '#d4edda' : 'transparent'}; border-radius: 8px;">
                                {trimUsername(user.email)} placed ${bid.price} at {new Date(bid.timestamp).toLocaleString()}
                            </li>
                        {:catch error}
                            <li>Error loading user details.</li>
                        {/await}
                    {/each}
                </ul>
            </div>
            <div class="bid-section">
                <input type="number" bind:value={newBidAmount} min={product.price} placeholder="Place your bid" />
                <button on:click={() => placeBid(product)}>Place Bid</button>
            </div>
        </div>

    {:catch error}
        <p>Error loading product details.</p>
    {/await}
</main>

<style>
    .product-detail-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;  /* Split the page in two halves */
        gap: 20px;
        margin: 20px;
        height: calc(100vh - 40px); /* Use the full height minus margins */
    }

    /* Left Section for the image and the table */
    .left-section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .countdown {
        color: #6200ee;
    }

    .product-image {
        width: 100%;
        height: auto;
        max-height: 60%;  /* Restrict the image to 60% of the left section */
        object-fit: contain;
        margin-bottom: 20px;
    }

    /* Table for product characteristics */
    .product-info-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 1rem;
        margin-top: 10px;
    }

    .product-info-table th, .product-info-table td {
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }

    .product-info-table th {
        text-align: left;
        font-weight: bold;
    }

    .product-info-table td {
        text-align: left;
    }

    /* Right Section for bids */
    .right-section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .bids-container {
        overflow-y: auto;
        flex-grow: 1;
        max-height: 70%;  /* Scrollable bids container */
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .bids-container ul {
        list-style-type: none;
        padding: 0;
    }

    .bids-container li {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }

    .bid-section {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        border-top: 1px solid #ddd;
    }

    .bid-section input {
        padding: 8px;
        width: 70%;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 10px;
    }

    .bid-section button {
        padding: 8px 12px;
        background-color: #6200ee;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .bid-section button:hover {
        background-color: #3700b3;
    }
</style>