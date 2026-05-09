<script lang="ts">
  import GamepadBtn from "./GamepadBtn.svelte"
  import type { JoystickState } from "../types"

  let {
    onchange,
  }: {
    onchange: (state: JoystickState) => void
  } = $props()

  let lastState = $state<JoystickState>({
    top: false,
    right: false,
    bottom: false,
    left: false,
  })

  function isEqualState(a: JoystickState, b: JoystickState): boolean {
    return (
      a.top === b.top &&
      a.bottom === b.bottom &&
      a.left === b.left &&
      a.right === b.right
    )
  }

  function setState(nextState: JoystickState): void {
    if (isEqualState(nextState, lastState)) {
      return
    }

    lastState = nextState
    onchange(nextState)
  }

  function activate(direction: keyof JoystickState): void {
    const nextState: JoystickState = {
      top: false,
      right: false,
      bottom: false,
      left: false,
    }

    nextState[direction] = true
    setState(nextState)
  }

  function deactivate(): void {
    setState({
      top: false,
      right: false,
      bottom: false,
      left: false,
    })
  }
</script>

<div class="dpad w-full h-full">
  <div
    class="dpad-frame w-full h-full p-2 bg-extra-dark-green border-[6px] border-dark-gray"
  >
    <div class="dpad-grid w-full h-full gap-2">
      <div class="dpad-slot dpad-top">
        <GamepadBtn
          onchange={(isDown) => {
            if (isDown) activate("top")
            else deactivate()
          }}
        >
          <span class="dpad-glyph text-light-green-blue">▲</span>
        </GamepadBtn>
      </div>

      <div class="dpad-slot dpad-left">
        <GamepadBtn
          onchange={(isDown) => {
            if (isDown) activate("left")
            else deactivate()
          }}
        >
          <span class="dpad-glyph text-light-green-blue">◀</span>
        </GamepadBtn>
      </div>

      <div class="dpad-center bg-dark-gray"></div>

      <div class="dpad-slot dpad-right">
        <GamepadBtn
          onchange={(isDown) => {
            if (isDown) activate("right")
            else deactivate()
          }}
        >
          <span class="dpad-glyph text-light-green-blue">▶</span>
        </GamepadBtn>
      </div>

      <div class="dpad-slot dpad-bottom">
        <GamepadBtn
          onchange={(isDown) => {
            if (isDown) activate("bottom")
            else deactivate()
          }}
        >
          <span class="dpad-glyph text-light-green-blue">▼</span>
        </GamepadBtn>
      </div>
    </div>
  </div>
</div>

<style>
  .dpad-frame {
    border-style: outset;
    box-shadow:
      inset 2px 2px 0 rgba(246, 242, 195, 0.15),
      inset -2px -2px 0 rgba(22, 13, 19, 0.45),
      0 6px 0 rgba(22, 13, 19, 0.25);
  }

  .dpad-glyph {
    font-size: 2.25rem;
    line-height: 1;
    filter: drop-shadow(1px 1px 0 rgba(22, 13, 19, 0.45));
  }

  .dpad-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
    grid-template-areas:
      ". top ."
      "left center right"
      ". bottom .";
  }

  .dpad-top {
    grid-area: top;
  }

  .dpad-left {
    grid-area: left;
  }

  .dpad-right {
    grid-area: right;
  }

  .dpad-bottom {
    grid-area: bottom;
  }

  .dpad-slot {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dpad-center {
    grid-area: center;
    border-style: inset;
    border-width: 6px;
    border-color: var(--color-dark-gray);
    box-shadow:
      inset 2px 2px 0 rgba(22, 13, 19, 0.35),
      inset -2px -2px 0 rgba(246, 242, 195, 0.1);
  }
</style>
