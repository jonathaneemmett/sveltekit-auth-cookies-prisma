<script>
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    export let form;
    export let data;

</script>

<h1>Login</h1>

<form action="?/login" method="post" use:enhance={() => {
    return async ({ result }) => {
        invalidateAll();

        await applyAction(result);
    };
}}>
    <div>
        <label for="username">Username</label>
        <input type="text" name="username" required>
    </div>

    <div>
        <label for="password">Password</label>
        <input type="password" name="password" required>
    </div>

    {#if form?.invalid}
        <p class="error">Username and password are required.</p>
    {/if}

    {#if form?.credentials}
        <p class="error">Invalid username or password.</p>
    {/if}

    <button type="submit">Log In</button>
</form>

<style>
    .error {
        color: red;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 300px;
    }

    form > div {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    form > div > label {
        margin-bottom: 5px;
    }

    form > div > input {
        padding: 1rem;
        border-radius: 5px;
    }

    form > button {
        padding: 1rem;
        border-radius: 5px;
        background-color: #000;
        color: #fff;
        border: none;
        cursor: pointer;
    }

</style>