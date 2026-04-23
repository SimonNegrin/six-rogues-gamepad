<script lang="ts">
  import InGame from "./InGame.svelte"
  import { globalState } from "./state.svelte"
  import WaitingPlayers from "./WaitingPlayers.svelte"
</script>

{#if globalState.inGame}
  <InGame />
{:else}
  <WaitingPlayers />
{/if}
