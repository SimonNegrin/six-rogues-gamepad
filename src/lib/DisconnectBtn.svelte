<script lang="ts">
  import { clearConnection } from "./connection.svelte"

  const enabled = import.meta.env.VITE_FEATURE_DISCONNECT_BTN === "true"
</script>

{#if enabled}
  <button
    class="fixed top-2 right-2 z-50 px-3 py-1 text-xs bg-tomato-red text-white font-bold rounded border-2 border-dark-gray cursor-pointer select-none active:opacity-70"
    onclick={clearConnection}
  >
    Desconectar
  </button>
{/if}
