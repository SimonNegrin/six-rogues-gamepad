<script lang="ts">
  import Btn from "./Btn.svelte"
  import Joystick from "./Joystick.svelte"
  import type { JoystickState } from "../types"
  import { onMount } from "svelte"
  import { on } from "svelte/events"

  let gamepadEl: HTMLDivElement

  onMount(() => {
    on(gamepadEl, "touchstart", preventDefault, { passive: false })
    on(gamepadEl, "touchend", preventDefault, { passive: false })
  })

  function onjoystick(state: JoystickState): void {
    console.log(state)
  }

  function abtn(isDown: boolean): void {
    console.log("abtn", isDown)
  }

  function bbtn(isDown: boolean): void {
    console.log("bbtn", isDown)
  }

  function cbtn(isDown: boolean): void {
    console.log("cbtn", isDown)
  }

  function dbtn(isDown: boolean): void {
    console.log("dbtn", isDown)
  }

  function preventDefault(event: TouchEvent): void {
    event.preventDefault()
  }
</script>

<div
  bind:this={gamepadEl}
  class="w-dvw h-dvh bg-amber-400 flex"
  role="group"
  aria-label="Gamepad táctil"
  tabindex="-1"
>
  <div class="w-1/3 bg-blue-400 relative">
    <div
      class="absolute bottom-4 left-4 w-65 h-65 rounded-full overflow-hidden"
    >
      <Joystick onchange={onjoystick} />
    </div>
  </div>
  <div class="w-1/3 bg-green-400"></div>
  <div class="w-1/3 relative">
    <div class="absolute bottom-4 right-4 w-65 h-65 flex flex-col bg-amber-800">
      <div class="h-1/3 bg-fuchsia-400 flex justify-center items-center">
        <Btn onchange={abtn} />
      </div>
      <div class="h-1/3 bg-fuchsia-500 flex justify-between items-center">
        <Btn onchange={dbtn} />
        <Btn onchange={bbtn} />
      </div>
      <div class="h-1/3 bg-fuchsia-600 flex justify-center items-center">
        <Btn onchange={cbtn} />
      </div>
    </div>
  </div>
</div>
