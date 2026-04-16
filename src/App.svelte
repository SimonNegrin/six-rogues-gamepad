<script lang="ts">
  import { PKT_GAMEPAD_STATE } from "./lib/contants"
  import Gamepad from "./lib/Gamepad.svelte"
  import type { GamepadState } from "./types"

  function onchange(gamepadState: GamepadState): void {
    const buffer = gamepadStateToArrayBuffer(gamepadState)
  }

  function gamepadStateToArrayBuffer(gamepadState: GamepadState): ArrayBuffer {
    const packet = new Uint8Array(2)

    // Byte 1: Tipo de paquete (1 = gamepad update)
    packet[0] = PKT_GAMEPAD_STATE

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

    packet[1] = buttons
    return packet.buffer
  }
</script>

<Gamepad {onchange} />
