<script lang="ts">
  import MyTurn from "./MyTurn.svelte"
  import { globalState } from "./state.svelte"
  import WaitingMyTurn from "./WaitingMyTurn.svelte"
</script>

{#if globalState.myTurn}
  <MyTurn />
{:else}
  <WaitingMyTurn />
{/if}
