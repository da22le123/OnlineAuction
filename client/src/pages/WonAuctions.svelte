<script>
    import { user } from '../stores/userStore';
    import { token } from '../stores/authStore';
    import { getCurrentDateNTime} from "../utils/date-time.js";
    import { onMount } from 'svelte';
    import router from 'page';

    let currentUserId;
    let tokenValue;
    let wonAuctions = [];

    user.subscribe(value => {
        currentUserId = value.id;
    });

    // Fetch the won auctions for the logged-in user
    async function fetchWonAuctions() {
        const response = await fetch(`http://localhost:3000/items/wins/${currentUserId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenValue}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        wonAuctions = data;
    }

    onMount(() => {
        if (!tokenValue) {
            router('/');  // Redirect to home if not logged in
        } else {
            fetchWonAuctions();
        }
    });

    token.subscribe(value => {
        tokenValue = value;
    });

</script>

<main class="won-auctions-page">
    <h2>Your Won Auctions</h2>
    {#if wonAuctions.length > 0}
        <div class="auctions-grid">
            {#each wonAuctions as auction}
                <div class="auction-card">
                    <img src={auction.imageUrl} alt={auction.name} class="auction-image"/>
                    <div class="auction-details">
                        <h3>{auction.name}</h3>
                        <p><strong>Winning Bid:</strong> ${auction.price}</p>
                        <p><strong>Auction Ended:</strong> {new Date(auction.auctionEnd).toLocaleString()}</p>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p>You haven't won any auctions yet.</p>
    {/if}
</main>

<style>
    .won-auctions-page {
        padding: 20px;
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 20px;
    }

    .auctions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

    .auction-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        text-align: center;
        background-color: #f9f9f9;
    }

    .auction-image {
        width: 100%;
        height: auto;
        max-height: 150px;
        object-fit: contain;
        margin-bottom: 10px;
    }

    .auction-details h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }

    .auction-details p {
        font-size: 1rem;
        margin: 5px 0;
    }
</style>
