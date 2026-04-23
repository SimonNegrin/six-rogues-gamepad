<script lang="ts">
  import PlayerConfig from "./PlayerConfig.svelte"
  import PlayerReady from "./PlayerReady.svelte"
  import { globalState } from "./state.svelte"
</script>

{#if globalState.player}
  <PlayerReady />
{:else}
  <PlayerConfig />
{/if}
