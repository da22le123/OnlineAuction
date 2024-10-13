<script>

    export let showModal;  // Controls whether the modal is visible or not
    export let selectedAuction;  // The auction to be edited
    export let closeModal;  // Function to close the modal
    export let updateAuction;  // Function to handle the update

</script>

{#if showModal}
    <div class="modal">
        <div class="modal-content">
            <span class="close" on:click={closeModal}>&times;</span>
            <h2>Edit Auction</h2>

            <form on:submit|preventDefault={updateAuction}>
                <label for="name">Name</label>
                <input type="text" id="name" bind:value={selectedAuction.name} required />

                <label for="image">Image URL</label>
                <input type="text" id="image" bind:value={selectedAuction.imageUrl} />

                <label for="processor">Processor</label>
                <select id="processor" bind:value={selectedAuction.processor}>
                    <option value="Intel i5">Intel i5</option>
                    <option value="Intel i7">Intel i7</option>
                    <option value="AMD Ryzen 5">AMD Ryzen 5</option>
                    <option value="AMD Ryzen 7">AMD Ryzen 7</option>
                </select>

                <label for="ram">RAM</label>
                <select id="ram" bind:value={selectedAuction.ram}>
                    <option value="8GB">8GB</option>
                    <option value="16GB">16GB</option>
                    <option value="32GB">32GB</option>
                </select>

                <label for="storage">Storage</label>
                <select id="storage" bind:value={selectedAuction.storage}>
                    <option value="SSD">SSD</option>
                    <option value="HDD">HDD</option>
                </select>

                <label for="graphics">Graphics Card</label>
                <select id="graphics" bind:value={selectedAuction.graphicsCard}>
                    <option value="Integrated">Integrated</option>
                    <option value="NVIDIA">NVIDIA</option>
                    <option value="AMD">AMD</option>
                </select>

                <label for="auctionEnd">Auction End Date</label>
                <input type="datetime-local" id="auctionEnd" bind:value={selectedAuction.auctionEnd} />

                <button type="submit" class="submit-btn">Save Changes</button>
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
