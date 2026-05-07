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

  function ontouchstart(): void {
    if (disabled) return
    onchange((isDown = true))
  }

  function ontouchend(): void {
    if (disabled) return
    if (isDown) {
      onchange((isDown = false))
    }
  }
</script>

<div class="w-20 h-20 relative">
  <div
    class="
      absolute w-24 h-24 -top-2 -left-2
      duration-100 bg-green-500 rounded-full
      flex justify-center items-center
    "
    class:bg-indigo-500={isDown}
    class:opacity-30={disabled}
    class:cursor-not-allowed={disabled}
    tabindex="-1"
    role="button"
    aria-disabled={disabled}
    {ontouchstart}
    {ontouchend}
  >
    {@render children()}
  </div>
</div>
