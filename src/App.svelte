<script lang="ts">
  import { onMount } from "svelte"
  import { PKT_GAMEPAD_STATE, TILE_SIZE } from "./lib/contants"
  import Gamepad from "./lib/Gamepad.svelte"
  import type { GamepadState } from "./types"
  import { connect, connection, sendData } from "./lib/connection.svelte"
  import PlayerConfig from "./lib/PlayerConfig.svelte"
  import ConnectionState from "./lib/ConnectionState.svelte"

  onMount(() => {
    const roomId = new URL(location.href).searchParams.get("r")
    if (!roomId) {
      console.warn("Room ID is required")
      return
    }
    console.log({ roomId })
    connect(roomId)
  })
</script>

<div class="w-dvw h-dvh" style:--tile-size="{TILE_SIZE}px">
  <ConnectionState />
  <!-- {#if connection.status === "CONN_CLOSED"}
    <div>Conectando a la sala...</div>
  {:else if connection.status === "CONN_OPENNING"}
    <div>Signaling...</div>
  {:else if connection.status === "CONN_OPEN"}
    <PlayerConfig />
    <Gamepad {onchange} />
  {/if} -->
</div>
