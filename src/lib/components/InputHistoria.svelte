<script lang="ts">
    export let inputText: string;
    export let showTextareaError: boolean;
</script>

<div class="w-full text-lg">
    <h2 class="mb-1 text-2xl font-bold text-center text-gradient">Historia académico</h2>
    <textarea
        bind:value={inputText}
        placeholder="Pega aquí tu historial académico..."
        rows="8"
        class="w-full p-3 mb-6 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004034] focus:border-[#004034] text-[#e0e4e2] resize-none"
    ></textarea>
    {#if showTextareaError}
        <p class="text-sm text-red-600">Este campo es requerido. Por favor, pega tu historia académico.</p>
    {/if}
</div>