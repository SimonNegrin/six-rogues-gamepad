<script lang="ts">
  import { onMount } from "svelte"
  import { PKT_GAMEPAD_STATE, TILE_SIZE } from "./lib/contants"
  import Gamepad from "./lib/Gamepad.svelte"
  import type { GamepadState } from "./types"
  import { connect, connection, sendData } from "./lib/connection.svelte"
  import PlayerConfig from "./lib/PlayerConfig.svelte"

  onMount(() => {
    const roomId = new URL(location.href).searchParams.get("r")
    if (!roomId) {
      console.warn("Room ID is required")
      return
    }
    console.log({ roomId })
    connect(roomId)
  })

  function onchange(gamepadState: GamepadState): void {
    const buffer = gamepadStateToArrayBuffer(gamepadState)
    sendData(buffer)
  }

  function gamepadStateToArrayBuffer(gamepadState: GamepadState): ArrayBuffer {
    // Byte 2: Estado de los botones (cada bit es un botón)
    let buttons = 0

    // Joystick state
    buttons |= +gamepadState.joystick.top << 7
    buttons |= +gamepadState.joystick.right << 6
    buttons |= +gamepadState.joystick.bottom << 5
    buttons |= +gamepadState.joystick.left << 4

    // Buttons state
    buttons |= +gamepadState.abtn << 3
    buttons |= +gamepadState.bbtn << 2
    buttons |= +gamepadState.cbtn << 1
    buttons |= +gamepadState.dbtn

    const packet = new Uint8Array(2)

    packet[0] = PKT_GAMEPAD_STATE
    packet[1] = buttons

    return packet.buffer
  }
</script>

<div class="w-dvw h-dvh" style:--tile-size="{TILE_SIZE}px">
  <PlayerConfig />
  <!-- {#if connection.status === "CONN_CLOSED"}
    <div>Conectando a la sala...</div>
  {:else if connection.status === "CONN_OPENNING"}
    <div>Signaling...</div>
  {:else if connection.status === "CONN_OPEN"}
    <Gamepad {onchange} />
  {/if} -->
</div>
