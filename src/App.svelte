<script lang="ts">
  import { onMount } from "svelte"
  import { connect } from "./lib/connection.svelte"
  import { TILE_SIZE } from "./lib/contants"
  import ConnectionState from "./lib/ConnectionState.svelte"

  onMount(() => {
    const roomId = new URL(location.href).searchParams.get("r")
    if (!roomId) {
      console.warn("Room ID is required")
      return
    }
    connect(roomId)
  })
</script>

<div class="w-dvw h-dvh" style:--tile-size="{TILE_SIZE}px">
  <ConnectionState />
</div>
