<script>
    import { token } from '../stores/authStore';  // Import the token store

    export let showModal = false;
    export let closeModal;

    let errorMessage = '';

    let email = '';
    let password = '';

    async function loginUser() {
        const response = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        let data;
        if (response.status === 200) {
            data = await response.json();
            token.set(data.token);  // Handle the JWT token here.
            errorMessage = '';  // Clear any previous error message
            closeModal();  // Close the modal upon successful login
        } else if (response.status === 400) {
            errorMessage = 'Bad credentials. Please try again.';
        } else {
            errorMessage = 'An error occurred.';
        }
    }

    function handleKeydown(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
</script>

{#if showModal}
    <div
            class="modal-overlay"
            on:click={closeModal}
            role="button"
            tabindex="0"
            on:keydown={handleKeydown}
            aria-label="Close modal">
        <div class="modal-content" on:click|stopPropagation>
            <h2>Login</h2>
            {#if errorMessage}
                <p class="error">{errorMessage}</p>  <!-- Display error if it exists -->
            {/if}
            <form on:submit|preventDefault={loginUser}>
                <input type="email" bind:value={email} placeholder="Email" required />
                <input type="password" bind:value={password} placeholder="Password" required />
                <button type="submit">Log In</button>
            </form>
            <p>Don't have an account yet?
                <a href="/register" on:click={closeModal}>Register here</a>
            </p>
        </div>
    </div>
{/if}

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 300px;
        text-align: center;
    }

    .error {
        color: red;
        margin-bottom: 10px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input {
        display: block;
        margin: 10px 0;
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }

    button {
        background-color: #6200ee;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #3700b3;
    }

    a {
        color: #6200ee;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
