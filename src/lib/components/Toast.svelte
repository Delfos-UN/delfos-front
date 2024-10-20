<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    export let message: string = '';
    export let type: 'success' | 'error' = 'success';
    export let duration: number = 3000;

    let isVisible = false;
    let timeoutId: NodeJS.Timeout;

    onMount(() => {
        isVisible = true;
        timeoutId = setTimeout(() => {
            isVisible = false;
        }, duration);
    });

    onDestroy(() => {
        clearTimeout(timeoutId);
    });
</script>

<style>
    .toast {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
        transition: opacity 0.3s;
    }

    .toast.success {
        background-color: #004236;
        color: #e0e4e2;
    }

    .toast.error {
        background-color: #581e23;
        color: #e0e4e2;
    }
</style>

{#if isVisible}
    <div class="toast {type}">
        {message}
    </div>
{/if}
