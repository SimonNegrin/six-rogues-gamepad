<script lang="ts">
  import Gamepad from "./lib/Gamepad.svelte"
  import type { GamepadState } from "./types"

  function onchange(gamepad: GamepadState): void {
    console.log(gamepad)
  }
</script>

<Gamepad {onchange} />
