<script>
    import SearchBar from './SearchBar.svelte';
    import LoginModal from './LoginModal.svelte';
    import { token } from '../stores/authStore';  // Import the store

    let showModal = false;
    let tokenValue;
    token.subscribe(value => {
        tokenValue = value;
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
    }

    async function handleSearch(searchQuery) {
        console.log("Searching for:", searchQuery);

        const response = await fetch(`${serverUrl}/items?searchQuery=${searchQuery}`)
        const data = await response.json();
        console.log(data);
    }
</script>

<nav>
    <!-- Left Section with Title and Subtitle -->
    <div class="left">
        <h3 class="title">Title</h3>
        <span class="subtitle">Subtitle</span>
    </div>

    <!-- SearchBar Component in the Middle -->
    <SearchBar bind:query={query} onSearch={handleSearch} />

    <!-- Right Section with Wins and Login Button -->
    <div class="right">
        <div>Wins</div>
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
</style>