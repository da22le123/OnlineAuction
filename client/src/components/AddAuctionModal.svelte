<script>
    import { getCurrentDateNTime } from "../utils/date-time.js";

    export let showAddModal;  // Controls whether the modal is visible or not
    export let closeAddModal;  // Function to close the modal
    export let postNewAuction;  // Function to handle creating a new auction

    // Auction fields for a new auction (start with empty values)
    let newAuction = {
        name: "",
        imageUrl: "",
        type: "Laptop",     // Default type option
        processor: "Intel i5", // Default processor option
        ram: "8GB", // Default RAM option
        storage: "SSD", // Default storage option
        graphicsCard: "Integrated", // Default graphics card option
        auctionEnd: "", // The user will select this
        price: 0
    };

    let currentDateTime = getCurrentDateNTime();

    // Function to handle form submission
    function handleAddAuction() {
        postNewAuction(newAuction);  // Call the postNewAuction function with the new auction data
        closeAddModal();  // Close the modal after the auction is added
    }
</script>

{#if showAddModal}
    <div class="modal">
        <div class="modal-content">
            <span class="close" on:click={closeAddModal}>&times;</span>
            <h2>Add New Auction</h2>

            <form on:submit|preventDefault={handleAddAuction}>
                <label for="name">Name</label>
                <input type="text" id="name" bind:value={newAuction.name} required />

                <label for="image">Image URL</label>
                <input type="text" id="image" bind:value={newAuction.imageUrl} required />

                <label for="processor">Processor</label>
                <select id="processor" bind:value={newAuction.processor}>
                    <option value="Intel i5">Intel i5</option>
                    <option value="Intel i7">Intel i7</option>
                    <option value="AMD Ryzen 5">AMD Ryzen 5</option>
                    <option value="AMD Ryzen 7">AMD Ryzen 7</option>
                </select>

                <label for="ram">RAM</label>
                <select id="ram" bind:value={newAuction.ram}>
                    <option value="8GB">8GB</option>
                    <option value="16GB">16GB</option>
                    <option value="32GB">32GB</option>
                </select>

                <label for="storage">Storage</label>
                <select id="storage" bind:value={newAuction.storage}>
                    <option value="SSD">SSD</option>
                    <option value="HDD">HDD</option>
                </select>

                <label for="graphics">Graphics Card</label>
                <select id="graphics" bind:value={newAuction.graphicsCard}>
                    <option value="Integrated">Integrated</option>
                    <option value="NVIDIA">NVIDIA</option>
                    <option value="AMD">AMD</option>
                </select>

                <label for="auctionEnd">Auction End Date</label>
                <input type="datetime-local" id="auctionEnd" bind:value={newAuction.auctionEnd} min={currentDateTime} required />

                <label for="price">Starting Price</label>
                <input type="number" id="price" bind:value={newAuction.price} min="0" required />

                <button type="submit" class="submit-btn">Add Auction</button>
            </form>
        </div>
    </div>
{/if}

<style>
    /* Modal styling */
    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 400px;
        max-width: 90%;
    }

    .close {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.5rem;
        cursor: pointer;
    }

    label {
        display: block;
        margin: 10px 0 5px;
    }

    input, select {
        width: 100%;
        padding: 8px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .submit-btn {
        background-color: #6200ee;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .submit-btn:hover {
        background-color: #3700b3;
    }
</style>
