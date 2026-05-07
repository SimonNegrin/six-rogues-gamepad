<script lang="ts">
  import GamepadBtn from "./GamepadBtn.svelte"
  import DPad from "./DPad.svelte"
  import type { GamepadState, JoystickState } from "../types"
  import { on } from "svelte/events"
  import SpriteItem from "./SpriteItem.svelte"
  import { sendData } from "./connection.svelte"
  import { PKT_GAMEPAD_STATE, PKT_NEXT_PLAYER } from "./contants"
  import CenterContent from "./CenterContent.svelte"
  import FullScreenBtn from "./FullScreenBtn.svelte"
  import { globalState } from "./state.svelte"
  import type { Attachment } from "svelte/attachments"

  const state: GamepadState = {
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

  function sendState(): void {
    const pkt = gamepadStateToPkt(state)
    sendData(pkt.buffer)
  }

  function gamepadStateToPkt(
    gamepadState: GamepadState,
  ): Uint8Array<ArrayBuffer> {
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

    return new Uint8Array([PKT_GAMEPAD_STATE, btns])
  }

  function onjoystick(joystick: JoystickState): void {
    state.joystick = joystick
    sendState()
  }

  function abtn(abtn: boolean): void {
    state.abtn = abtn
    sendState()
  }

  function bbtn(bbtn: boolean): void {
    state.bbtn = bbtn
    sendState()
  }

  function cbtn(cbtn: boolean): void {
    state.cbtn = cbtn
    sendState()
  }

  function dbtn(dbtn: boolean): void {
    state.dbtn = dbtn
    sendState()
  }

  function preventDefault(event: Event): void {
    event.preventDefault()
  }

  function onNext(isDown: boolean): void {
    if (isDown) {
      const pkt = new Uint8Array([PKT_NEXT_PLAYER])
      sendData(pkt.buffer)
    }
  }

  const cancelTouch: Attachment = (el: Element) => {
    on(el, "touchstart", preventDefault, { passive: false })
    on(el, "touchmove", preventDefault, { passive: false })
    on(el, "touchend", preventDefault, { passive: false })
  }
</script>

<div
  class="w-dvw h-dvh bg-amber-400 flex"
  role="group"
  aria-label="Gamepad táctil"
  tabindex="-1"
>
  <div class="w-1/3 relative" {@attach cancelTouch}>
    <div class="absolute bottom-4 left-4 w-65 h-65">
      <DPad onchange={onjoystick} />
    </div>
  </div>
  <div class="w-1/3">
    <CenterContent>
      <FullScreenBtn />
      <div {@attach cancelTouch}>
        <GamepadBtn onchange={onNext}>Next</GamepadBtn>
      </div>
    </CenterContent>
  </div>
  <div class="w-1/3 relative" {@attach cancelTouch}>
    <div class="absolute bottom-4 right-4 w-65 h-65 flex flex-col">
      <div class="h-1/3 flex justify-center items-start">
        <GamepadBtn onchange={abtn} disabled={!globalState.player?.magic}>
          <SpriteItem name="wide-brimmed hat" scale={2} />
        </GamepadBtn>
      </div>
      <div class="h-1/3 flex justify-between items-center">
        <GamepadBtn onchange={dbtn} disabled={!globalState.player?.aim}>
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
