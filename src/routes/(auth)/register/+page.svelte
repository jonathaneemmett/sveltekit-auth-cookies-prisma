<script>
    import { enhance } from '$app/forms';
    export let form;
    export let data;
    
</script>

<h1>Register</h1>

<form action="?/register" method="POST" use:enhance>
    <div>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" required>
    </div>

    <div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required>
    </div>

    {#if form?.user}
        <p class="error">Username is taken</p>
    {/if}

    <button type="submit">Register</button>
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