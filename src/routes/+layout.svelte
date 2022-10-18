<script>
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    export let form;
    export let data;

</script>

<nav>
    {#if !$page.data.user}
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    {:else}
        <a href="/admin">Admin</a>
        <form action="/logout" method="POST" use:enhance={() => {
            return async ({ result }) => {
                invalidateAll();
                await applyAction(result);
            };
        }}>
            <button type="submit">Logout</button>
       
        </form>
    {/if}


</nav>

<main>
    <slot />
</main>