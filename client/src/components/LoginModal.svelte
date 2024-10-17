<script>
    import { token } from '../stores/authStore'; // Import the token store

    export let showModal = false;
    export let closeModal;

    let errorMessage = '';

    let email = '';
    let password = '';

    let confirmPassword = '';

    let isRegister = false;  // State to switch between login and register



    async function loginUser() {
        const response = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        let data;
        if (response.status === 200) {
            data = await response.json();
            const foundUser = await fetchUserByEmail(); //contains password as well, we don't want to store password in the store
            let userData = {
                id: foundUser.id,
                email: foundUser.email,
                isAdmin: foundUser.isAdmin
            }

            token.set(data.token);  // Handle the JWT token here.


            errorMessage = '';  // Clear any previous error message
            closeModal();  // Close the modal upon successful login
        } else if (response.status === 400) {
            errorMessage = 'Bad credentials. Please try again.';
        } else {
            errorMessage = 'An error occurred.';
        }
    }

    async function fetchUserByEmail() {
        const response = await fetch(`http://localhost:3000/users?email=${email}`);
        const data = await response.json();
        return data;
    }

    async function registerUser() {
        if (password !== confirmPassword) {
            errorMessage = 'Passwords do not match.';
            return;
        }
        const isAdmin = false;
        const responseUserPost = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, isAdmin})
        });

        if (responseUserPost.status !== 201) {
            errorMessage = 'An error occurred.';
            return;
        }

        const userId = await responseUserPost.json();

        if (!userId.id) {
            errorMessage = 'An error occurred. User id is not returned';
            return;
        }

        const responseTokenPost = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        let data;
        if (responseTokenPost.status === 200) {
            data = await responseTokenPost.json();

            let userData = {
                id: userId.id,
                email: email,
                isAdmin: isAdmin
            }

            token.set(data.token);  // Handle the JWT token here.

            console.log(data.token);
            closeModal();  // Close the modal upon successful login

            errorMessage = '';  // Clear any previous error message
        }
    }



    function handleKeydown(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    // Switch to the register modal
    function switchToRegister() {
        isRegister = true;
    }

    function switchToLogin() {
        isRegister = false;
    }
</script>

{#if showModal}
    <div class="modal-overlay" on:click={closeModal}>
        <div class="modal-content" on:click|stopPropagation>
            {#if !isRegister}
                <h2>Login</h2>
                {#if errorMessage}
                    <p class="error">{errorMessage}</p>
                {/if}
                <form on:submit|preventDefault={loginUser}>
                    <input type="email" bind:value={email} placeholder="Email" required />
                    <input type="password" bind:value={password} placeholder="Password" required />
                    <button type="submit">Log In</button>
                </form>
                <p>Don't have an account yet?
                    <button on:click={switchToRegister} class="link-button">Register here</button>
                </p>
            {:else}
                <!-- Register Form -->
                <h2>Register</h2>
                {#if errorMessage}
                    <p class="error">{errorMessage}</p>
                {/if}
                <form on:submit|preventDefault={registerUser}>
                    <input type="email" bind:value={email} placeholder="Email" required />
                    <input type="password" bind:value={password} placeholder="Password" required />
                    <input type="password" bind:value={confirmPassword} placeholder="Confirm Password" required />
                    <button type="submit">Register</button>
                </form>
                <p>Already have an account?
                    <button on:click={switchToLogin} class="link-button">Log in here</button>
                </p>
            {/if}
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
