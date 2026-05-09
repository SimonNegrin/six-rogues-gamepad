<script lang="ts">
  import type { Snippet } from "svelte"

  let {
    onchange,
    children,
    disabled = false,
  }: {
    onchange: (isDown: boolean) => void
    children: Snippet
    disabled?: boolean
  } = $props()

  let isDown = $state(false)

  function ontouchstart(event: TouchEvent): void {
    event.preventDefault()
    if (disabled) return
    onchange((isDown = true))
  }

  function ontouchend(event: TouchEvent): void {
    event.preventDefault()
    if (disabled) return
    if (isDown) {
      onchange((isDown = false))
    }
  }

  function ontouchcancel(event: TouchEvent): void {
    event.preventDefault()
    if (disabled) return
    if (isDown) {
      onchange((isDown = false))
    }
  }
</script>

<button
  type="button"
  class="
    gamepad-btn
    w-full h-full
    duration-75 select-none touch-none
    bg-dark-yellow-green border-[6px] border-yellow-green
    flex items-center justify-center
  "
  class:is-down={isDown}
  class:bg-extra-dark-purple={isDown}
  class:opacity-35={disabled}
  class:cursor-not-allowed={disabled}
  {disabled}
  aria-disabled={disabled}
  {ontouchstart}
  {ontouchend}
  {ontouchcancel}
>
  <span class="w-full h-full flex items-center justify-center">
    {@render children()}
  </span>
</button>

<style>
  .gamepad-btn {
    border-style: outset;
    box-shadow:
      inset 2px 2px 0 rgba(246, 242, 195, 0.25),
      inset -2px -2px 0 rgba(22, 13, 19, 0.5),
      0 3px 0 rgba(22, 13, 19, 0.35);
  }

  .gamepad-btn:active:not(:disabled),
  .gamepad-btn.is-down {
    border-style: inset;
    transform: translate(1px, 1px);
    box-shadow:
      inset 2px 2px 0 rgba(22, 13, 19, 0.35),
      inset -2px -2px 0 rgba(246, 242, 195, 0.18),
      0 2px 0 rgba(22, 13, 19, 0.25);
  }
</style>
