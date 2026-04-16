<script lang="ts">
  import Btn from "./Btn.svelte"
  import Joystick from "./Joystick.svelte"
  import type { GamepadState, JoystickState } from "../types"
  import { onMount } from "svelte"
  import { on } from "svelte/events"

  let {
    onchange,
  }: {
    onchange: (state: GamepadState) => void
  } = $props()

  let gamepadEl: HTMLDivElement

  let state: GamepadState = {
    joystick: {
      top: false,
      bottom: false,
      left: false,
      right: false,
    },
    abtn: false,
    bbtn: false,
    cbtn: false,
    dbtn: false,
  }

  onMount(() => {
    on(gamepadEl, "touchstart", preventDefault, { passive: false })
    on(gamepadEl, "touchmove", preventDefault, { passive: false })
    on(gamepadEl, "touchend", preventDefault, { passive: false })
  })

  function emit(): void {
    onchange(state)
  }

  function onjoystick(joystick: JoystickState): void {
    state = { ...state, joystick }
    emit()
  }

  function abtn(abtn: boolean): void {
    state = { ...state, abtn }
    emit()
  }

  function bbtn(bbtn: boolean): void {
    state = { ...state, bbtn }
    emit()
  }

  function cbtn(cbtn: boolean): void {
    state = { ...state, cbtn }
    emit()
  }

  function dbtn(dbtn: boolean): void {
    state = { ...state, dbtn }
    emit()
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
  <div class="w-1/3 relative">
    <div class="absolute bottom-4 left-4 w-65 h-65">
      <Joystick onchange={onjoystick} />
    </div>
  </div>
  <div class="w-1/3"></div>
  <div class="w-1/3 relative">
    <div class="absolute bottom-4 right-4 w-65 h-65 flex flex-col">
      <div class="h-1/3 flex justify-center items-start">
        <Btn onchange={abtn} />
      </div>
      <div class="h-1/3 flex justify-between items-center">
        <Btn onchange={dbtn} />
        <Btn onchange={bbtn} />
      </div>
      <div class="h-1/3 flex justify-center items-end">
        <Btn onchange={cbtn} />
      </div>
    </div>
  </div>
</div>
