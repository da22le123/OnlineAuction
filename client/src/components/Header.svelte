<script>
    import SearchBar from './SearchBar.svelte';
    import LoginModal from './LoginModal.svelte';
    import { token } from '../stores/authStore';
    import {currentPath} from "../stores/currentPathStore.js";
    import router from 'page';
    import {getUserDataFromToken} from "../utils/user-utils.js";

    let currentUser;
    let showModal = false;
    let tokenValue;
    let activeRoute = '/';  // Initialize the route with the default

    token.subscribe(value => {
        tokenValue = value;
    });

    // Subscribe to the current route store
    currentPath.subscribe(value => {
        activeRoute = value;  // Update the activeRoute whenever the route changes
    });

    let query = "";
    const serverUrl = "http://localhost:3000";

    function openModal() {
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    function logout() {
        token.set(null);  // Update store when logging out
        router('/');      // Optionally redirect to the home page after logging out
    }

    async function handleSearch(searchQuery) {
        const response = await fetch(`${serverUrl}/items?searchQuery=${searchQuery}`)
        const data = await response.json();
    }

    // Navigate back to the product section
    function goBack() {
        router('/');
    }

    function goToAdminDashboard() {
        router('/admin');  // Navigate to the Admin Dashboard
    }

    function goToWinsPage() {
        router('/won-auctions');  // Navigate to Won Auctions page
    }

    $: currentUser = getUserDataFromToken(tokenValue);

</script>

<nav>
    <!-- Left Section with Title and Subtitle -->
    <div class="left">
        <h3 class="title">OnlineAuction </h3>
    </div>

    <!-- Conditionally show search bar or go-back button based on route -->
    {#if !activeRoute.includes('/laptops/') && !activeRoute.includes('/admin') && !activeRoute.includes('/won-auctions') }
        <!-- SearchBar Component in the Middle -->
        <SearchBar bind:query={query} on:Search={handleSearch} />
    {:else}
        <!-- Go back button for product details page -->
        <button class="back-button" on:click={goBack}>
            <span class="back-arrow">←</span> Back
        </button>
    {/if}

    <!-- Right Section with Wins and Login Button -->
    <div class="right">

        <!-- Conditionally display Admin Dashboard button -->
        {#if currentUser && currentUser.isAdmin && !activeRoute.includes('/admin')}
            <div class="admin-button">
                <button on:click={goToAdminDashboard}>Admin Dashboard</button>
            </div>
        {/if}

        <!-- Conditionally display Wins button if user is logged in -->
        {#if currentUser && !activeRoute.includes('/won-auctions')}
            <div class="wins-button">
                <button on:click={goToWinsPage}>Won auctions</button>
            </div>
        {/if}

        {#if tokenValue}
            <button on:click={logout}>Log Out</button>
        {:else}
            <button on:click={openModal}>Log In</button>
        {/if}
    </div>

    <LoginModal {showModal} closeModal={closeModal} />
</nav>

<style>
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #111;
        border-radius: 10px;
        padding: 12px;
    }

    .left {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }

    .right {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .title {
        margin: 0;
    }

    .subtitle {
        font-size: 14px;
        color: rgb(128, 128, 128);
    }

    .back-button {
        background-color: #6200ee;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .back-button:hover {
        background-color: #3700b3;
    }

    .admin-button {
        margin-right: 10px;
    }

    .wins-button button, .admin-button button {
        padding: 8px 12px;
        background-color: #6200ee;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .wins-button button:hover, .admin-button button:hover {
        background-color: #3700b3;
    }

    .back-arrow {
        margin-right: 8px;
        font-size: 18px;
    }
</style>