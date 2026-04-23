<script lang="ts">
  import type { GamepadState } from "../types"
  import { sendData } from "./connection.svelte"
  import { PKT_GAMEPAD_STATE } from "./contants"
  import Gamepad from "./Gamepad.svelte"

  function onchange(gamepadState: GamepadState): void {
    const pkt = gamepadStateToArrayBuffer(gamepadState)
    sendData(pkt)
  }

  function gamepadStateToArrayBuffer(gamepadState: GamepadState): ArrayBuffer {
    // Byte 2: Estado de los botones (cada bit es un botón)
    let btns = 0

    // Joystick state
    btns |= +gamepadState.joystick.top << 7
    btns |= +gamepadState.joystick.right << 6
    btns |= +gamepadState.joystick.bottom << 5
    btns |= +gamepadState.joystick.left << 4

    // Buttons state
    btns |= +gamepadState.abtn << 3
    btns |= +gamepadState.bbtn << 2
    btns |= +gamepadState.cbtn << 1
    btns |= +gamepadState.dbtn

    const packet = new Uint8Array(2)

    packet[0] = PKT_GAMEPAD_STATE
    packet[1] = btns

    return packet.buffer
  }
</script>

<Gamepad {onchange} />
