<script>
    import {calculateTimeRemaining} from "../utils/date-time.js";
    import {isBidValid, isLoggedIn} from "../utils/validation.js";
    import {token} from "../stores/authStore.js";
    import {onDestroy, onMount} from "svelte";
    import {getUserDataFromToken} from "../utils/user-utils.js";

    export let params;  // Declare 'params' as a prop
    const productId = params.id;  // Get the product ID from the URL params

    let tokenValue;
    let currentUser;
    let errorMessage = '';  // To hold any error messages


    let currentPrice;
    let newBidAmount = 0;  // To hold the new bid amount
    let timeRemaining = '';  // To hold the countdown string

    let eventSource;

    let bids = [];  // Array to store bids

    token.subscribe(value => {
        tokenValue = value;
    });

    onMount(() => {
        currentUser = getUserDataFromToken(tokenValue);
        bids=[];
    });


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
        bids = [...data.bids].reverse();  // Reverse bids to show latest first

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
        if (!isLoggedIn()) {
            errorMessage = 'Please log in to place a bid.';
            return;
        }

        currentPrice = getHighestBid(product);

        if (isBidValid(newBidAmount, currentPrice)) {
            // Post the bid to the server
            postBid(product.id, newBidAmount, currentUser.userId);


            errorMessage = "";
        } else {
            errorMessage = "Invalid bid amount for product ", product.name;
        }

    }

    function getHighestBid(product) {
        if (bids.length > 0) {
            return bids[0].price;
        }
        return product.price;
    }

    async function postBid(productId, newBidAmount, userIdMadeBy) {
        const response = await fetch(
            `http://localhost:3000/items/${productId}/bids`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${tokenValue}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    timestamp: new Date().toISOString().slice(0, 16),
                    price: newBidAmount,
                    user: userIdMadeBy
                })
            }
        );



        const data = await response.json();
        return data;
    }

    function trimUsername(email) {
        return email.split('@')[0];
    }

    // Subscribe to the Server-Sent Events (SSE) stream for new bids
    function startBidStreaming() {
        if (eventSource){
            eventSource.close(); // Close previous EventSource before creating a new one
        }

        eventSource = new EventSource(`http://localhost:3000/items/${productId}/bids/stream`);

        // Listen for new bid events
        eventSource.onmessage = function(event) {
            const newBid = JSON.parse(event.data);

            // Only add the bid if it's newer than the last bid
            if (bids.length === 0 || newBid.price !== bids[0].price) {
                bids = [newBid, ...bids];  // Add the new bid to the top of the list
                currentPrice = newBid.price;  // Update the current price
            }
        };

        // Handle connection closing
        eventSource.onerror = function() {
            errorMessage = "Error in SSE connection.";
            eventSource.close();  // Close the connection on error
        };

        // Handle the client manually closing the connection (e.g., leaving the page)
        eventSource.addEventListener('close', function() {
            errorMessage = "Client closed the SSE connection.";
            eventSource.close();
        });
    }

    // Ensure SSE closes properly
    function cleanUpSSE() {
        if (eventSource) {
            eventSource.close();
        }
    }

    onDestroy(() => {
        cleanUpSSE();
    });

    // Start streaming bids when the component loads
    $: if (productId) {
        cleanUpSSE(); // Ensure previous SSE is closed
        fetchProductById(); // Fetch the product details
        startBidStreaming(); // Start SSE streaming for the current product
    }



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
                    {#each bids as bid, index}
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

            <!-- Display error message if present -->
            {#if errorMessage}
                <p class="error-message">{errorMessage}</p>
            {/if}

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

    .error-message {
        color: red;
        font-weight: bold;
        margin-bottom: 10px;
    }
</style>