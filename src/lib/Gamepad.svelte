<script lang="ts">
  import GamepadBtn from "./GamepadBtn.svelte"
  import Joystick from "./Joystick.svelte"
  import type { GamepadState, JoystickState } from "../types"
  import { onMount } from "svelte"
  import { on } from "svelte/events"
  import SpriteItem from "./SpriteItem.svelte"

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
    state.joystick = joystick
    emit()
  }

  function abtn(abtn: boolean): void {
    state.abtn = abtn
    emit()
  }

  function bbtn(bbtn: boolean): void {
    state.bbtn = bbtn
    emit()
  }

  function cbtn(cbtn: boolean): void {
    state.cbtn = cbtn
    emit()
  }

  function dbtn(dbtn: boolean): void {
    state.dbtn = dbtn
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
        <GamepadBtn onchange={abtn}>
          <SpriteItem name="wide-brimmed hat" scale={2} />
        </GamepadBtn>
      </div>
      <div class="h-1/3 flex justify-between items-center">
        <GamepadBtn onchange={cbtn}>
          <SpriteItem name="arrows" scale={2} />
        </GamepadBtn>
        <GamepadBtn onchange={bbtn}>
          <SpriteItem name="short sword" scale={2} />
        </GamepadBtn>
      </div>
      <div class="h-1/3 flex justify-center items-end">
        <GamepadBtn onchange={cbtn}>
          <SpriteItem name="leather boots" scale={2} />
        </GamepadBtn>
      </div>
    </div>
  </div>
</div>
