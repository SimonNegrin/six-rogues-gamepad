<script lang="ts">
  import Delay from "./Delay"

  let {
    onchange,
  }: {
    onchange: (isDown: boolean) => void
  } = $props()

  const delay = new Delay(300)

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
    class="absolute w-24 h-24 -top-2 -left-2 bg-green-500 rounded-full"
    class:bg-indigo-500={isDown}
    tabindex="-1"
    role="button"
    {ontouchstart}
    {ontouchend}
  ></div>
</div>
