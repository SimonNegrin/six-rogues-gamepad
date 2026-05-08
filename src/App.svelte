<script lang="ts">
  import { onMount } from "svelte"
  import { connect, connection, CONN_CLOSED } from "./lib/connection.svelte"
  import { TILE_SIZE } from "./lib/contants"
  import ConnectionState from "./lib/ConnectionState.svelte"
  import DisconnectBtn from "./lib/DisconnectBtn.svelte"

  let roomId: string | null = null

  onMount(() => {
    roomId = new URL(location.href).searchParams.get("r")
    if (!roomId) {
      console.warn("Room ID is required")
      return
    }
    connect(roomId)
  })

  $effect(() => {
    if (connection.status === CONN_CLOSED && roomId) {
      const timer = setTimeout(() => connect(roomId!), 1000)
      return () => clearTimeout(timer)
    }
  })
</script>

<DisconnectBtn />

<div class="w-dvw h-dvh text-mist-100" style:--tile-size="{TILE_SIZE}px">
  <ConnectionState />
</div>
