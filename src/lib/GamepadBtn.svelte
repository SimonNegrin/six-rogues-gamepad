<script lang="ts">
  import type { Snippet } from "svelte"
  import Delay from "./Delay"

  let {
    onchange,
    children,
  }: {
    onchange: (isDown: boolean) => void
    children: Snippet
  } = $props()

  const delay = new Delay(200)

  let isDown = $state(false)

  function ontouchstart(): void {
    delay.schedule(() => {
      onchange((isDown = true))
    })
  }

  function ontouchend(): void {
    delay.cancel()
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
    tabindex="-1"
    role="button"
    {ontouchstart}
    {ontouchend}
  >
    {@render children()}
  </div>
</div>
