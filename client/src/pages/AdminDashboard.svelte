<script>
    //In this component I can't find any other way to update the list of auction items after deleting an item.
    // I tried using a refreshTrigger variable to force a re-fetch of the auction items, but it doesn't work.
    // I also tried using a reactive statement to re-fetch the auction items when the token changes, but it doesn't work either.
    // So I found no way to update the list of auction items after deleting an item while using the {#await} block and
    // avoiding the fetch call in the onMount function. But for svelte to update the list of auction items after deleting an item,
    // I had to use list of auctions as a variable.




    import { token } from "../stores/authStore.js";
    import {onMount} from "svelte";
    import EditAuctionModal from '../components/EditAuctionModal.svelte';
    import AddAuctionModal from '../components/AddAuctionModal.svelte';  // Import the AddAuctionModal component
    import Page from "page";
    import {getUserDataFromToken} from "../utils/user-utils.js";

    let loadedAuctions = [];  // Initialize as an empty array to prevent the {#each} error
    let tokenValue;
    let currentUser;
    let showEditModal = false; // Controls whether the edit modal is visible or not
    let showAddModal = false;  // Controls whether the add modal is visible or not
    let selectedAuction = {};  // Store the selected auction for editing

    $: currentUser = getUserDataFromToken();  // Get the current user from the token

    token.subscribe(value => {
        tokenValue = value;
    });

    // Does not allow non-admin users to access the Admin Dashboard
    onMount(async () => {
        currentUser = getUserDataFromToken(tokenValue);
        if (currentUser === null || currentUser === undefined || !currentUser.isAdmin) {
            Page.redirect('/');
        }

        loadedAuctions = await fetchAuctions();
    });

    async function fetchAuctions() {
        const response = await fetch('http://localhost:3000/items');
        const data = await response.json();
        return data;
    }

    // Handle adding a new auction
    function addAuction() {
        showAddModal = true;  // Open the modal
    }

    // Function to handle Editing of auctions
    function editAuction(auctionId) {
        selectedAuction = loadedAuctions.find(auction => auction.id === auctionId);
        showEditModal = true;  // Open the modal
    }

    // Close edit modal
    function closeEditModal() {
        showEditModal = false;
        selectedAuction = {};  // Clear selected auction when closing the modal
    }

    function closeAddModal() {
        showAddModal = false;
    }

    async function updateAuction() {
       const response = await fetch(`http://localhost:3000/items/${selectedAuction.id}`, {
           method: 'PUT',
           headers: {
               'Authorization': `Bearer ${tokenValue}`,
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(selectedAuction)
       });

       if (response.ok) {
           alert('Auction updated successfully');
           loadedAuctions = await fetchAuctions();
           closeEditModal();
       } else {
           const errorMsg = await response.json();
           alert('Failed to update auction ' + errorMsg.message);
       }
    }

    async function postNewAuction(newAuction) {
        const response = await fetch(`http://localhost:3000/items`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${tokenValue}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAuction)
        });

        if (response.ok) {
            // Refresh the auction list after adding
            loadedAuctions = await fetchAuctions();
            alert('Auction added successfully');
        } else {
            const errMsg = await response.json();
            alert(errMsg.error);
        }
    }

    async function deleteAuction(auctionId) {
        const confirmation = confirm('Are you sure you want to delete this auction?');

        if (!confirmation) {
            return;  // If the user cancels, exit the function
        }

        // Call API to delete auction
        const response = await fetch(`http://localhost:3000/items/${auctionId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${tokenValue}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            // re-fetch the auctions after deleting an item
            loadedAuctions = await fetchAuctions();
        } else {
            console.error('Failed to delete auction');
        }
    }
</script>

<main>
    <h2>Auctions</h2>
    <p>To view full information, go to auction page.</p>

    <div class="auction-actions">
        <button on:click={addAuction} class="add-auction-btn">Add Auction</button>
    </div>

    <table class="auction-table">
        <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>End Date</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {#each loadedAuctions as auction}
            <tr>
                <td>{auction.id}</td>
                <td>{auction.name}</td>
                <td class="end-date">{new Date(auction.auctionEnd).toLocaleString()}</td>
                <td>
                    <button on:click={() => editAuction(auction.id)} class="edit-btn">Edit</button>
                    <button on:click={() => deleteAuction(auction.id)} class="delete-btn">Delete</button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>

    {#if showEditModal === true}
        <EditAuctionModal
            {showEditModal}
            {selectedAuction}
            {closeEditModal}
            {updateAuction}
        />
    {/if}

    {#if showAddModal === true}
        <AddAuctionModal
                {showAddModal}
                {closeAddModal}
                {postNewAuction}
        />
    {/if}
</main>

<style>
    main {
        padding: 20px;
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 10px;
    }

    p {
        margin-bottom: 20px;
    }

    .auction-actions {
        margin-bottom: 20px;
        text-align: right;
    }

    .add-auction-btn {
        background-color: #6200ee;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .add-auction-btn:hover {
        background-color: #3700b3;
    }

    .auction-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 1rem;
    }

    .auction-table th, .auction-table td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
    }

    .auction-table th {
        background-color: #f9f9f9;
        font-weight: bold;
    }

    .end-date {
        color: #28a745;
    }

    .edit-btn, .delete-btn {
        padding: 5px 10px;
        border: none;
        cursor: pointer;
        border-radius: 4px;
    }

    .edit-btn {
        background-color: #6200ee;
        color: white;
        margin-right: 5px;
    }

    .edit-btn:hover {
        background-color: #3700b3;
    }

    .delete-btn {
        background-color: #dc3545;
        color: white;
    }

    .delete-btn:hover {
        background-color: #c82333;
    }

</style>