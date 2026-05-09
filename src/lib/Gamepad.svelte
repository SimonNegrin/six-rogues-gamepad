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

  function calcHealth(health: number, maxHealth: number): number {
    if (maxHealth === 0) return 0
    return 100 * (health / maxHealth)
  }
</script>

<div
  class="gamepad-root w-dvw h-dvh bg-extra-dark-blue flex flex-col text-mild-yellow-white"
  role="group"
  aria-label="Gamepad táctil"
  tabindex="-1"
>
  <div class="shrink-0 px-3 pt-3 pb-2">
    <div
      class="panel-outset bg-extra-dark-green border-[6px] border-dark-gray px-3 py-2 flex items-center gap-3"
    >
      <div
        class="panel-inset w-full h-4 bg-black/30 border-4 border-dark-gray overflow-hidden"
      >
        <div
          class="h-full bg-tomato-red transition-all duration-200"
          style:width="{calcHealth(globalState.health, globalState.maxHealth)}%"
        ></div>
      </div>
      <span class="text-sm font-bold shrink-0 text-mild-yellow-white"
        >{globalState.health}/{globalState.maxHealth}</span
      >
    </div>
  </div>
  <div class="flex-1 flex">
    <div class="w-1/3 relative px-3 pb-3" {@attach cancelTouch}>
      <div
        class="panel-outset absolute bottom-4 left-4 w-65 h-65 bg-extra-dark-blue/30 border-[6px] border-dark-gray p-3"
      >
        <DPad onchange={onjoystick} />
      </div>
    </div>
    <div class="w-1/3 px-3 pb-3">
      <div
        class="panel-outset w-full h-full bg-extra-dark-blue/25 border-[6px] border-dark-gray px-4 py-5"
      >
        <CenterContent>
          <FullScreenBtn />
          <div {@attach cancelTouch} class="">
            <GamepadBtn onchange={onNext}>Next</GamepadBtn>
          </div>
        </CenterContent>
      </div>
    </div>
    <div class="w-1/3 relative px-3 pb-3" {@attach cancelTouch}>
      <div
        class="panel-outset absolute bottom-4 right-4 w-65 h-65 bg-extra-dark-blue/30 border-[6px] border-dark-gray p-4"
      >
        <div class="action-grid w-full h-full gap-2">
          {#if globalState.canCastMagic}
            <div class="action-slot action-a flex items-center justify-center">
              <GamepadBtn onchange={abtn}>
                <SpriteItem name="wide-brimmed hat" scale={2} />
              </GamepadBtn>
            </div>
          {/if}

          {#if globalState.canCastMagic}
            <div class="action-slot action-d flex items-center justify-center">
              <GamepadBtn onchange={dbtn}>
                <SpriteItem name="arrows" scale={2} />
              </GamepadBtn>
            </div>
          {/if}

          <div class="action-center bg-dark-gray"></div>

          <div class="action-slot action-b flex items-center justify-center">
            <GamepadBtn onchange={bbtn}>
              <SpriteItem name="short sword" scale={2} />
            </GamepadBtn>
          </div>

          <div class="action-slot action-c flex items-center justify-center">
            <GamepadBtn onchange={cbtn}>
              <SpriteItem name="leather boots" scale={2} />
            </GamepadBtn>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .panel-outset {
    border-style: outset;
    box-shadow:
      inset 2px 2px 0 rgba(246, 242, 195, 0.12),
      inset -2px -2px 0 rgba(22, 13, 19, 0.4),
      0 6px 0 rgba(22, 13, 19, 0.2);
  }

  .panel-inset {
    border-style: inset;
    box-shadow:
      inset 2px 2px 0 rgba(22, 13, 19, 0.35),
      inset -2px -2px 0 rgba(246, 242, 195, 0.08);
  }

  .gamepad-root {
    background-image: linear-gradient(
        rgba(246, 242, 195, 0.03),
        rgba(246, 242, 195, 0.03)
      ),
      radial-gradient(
        circle at 20% 10%,
        rgba(155, 76, 99, 0.12),
        transparent 55%
      ),
      radial-gradient(
        circle at 80% 90%,
        rgba(142, 184, 158, 0.1),
        transparent 60%
      );
  }

  .action-center {
    border-style: inset;
    border-width: 6px;
    border-color: var(--color-dark-gray);
    box-shadow:
      inset 2px 2px 0 rgba(22, 13, 19, 0.35),
      inset -2px -2px 0 rgba(246, 242, 195, 0.1);
  }

  .action-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
    grid-template-areas:
      ". a ."
      "d c b"
      ". e .";
  }

  .action-a {
    grid-area: a;
  }

  .action-b {
    grid-area: b;
  }

  .action-c {
    grid-area: e;
  }

  .action-d {
    grid-area: d;
  }

  .action-center {
    grid-area: c;
  }
</style>
