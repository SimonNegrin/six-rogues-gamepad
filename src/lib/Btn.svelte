<script lang="ts">
  let {
    onchange,
  }: {
    onchange?: (isDown: boolean) => void
  } = $props()

  function createHandler(isDown: boolean): (event: TouchEvent) => void {
    return () => onchange?.(isDown)
  }
</script>

<div
  class="w-20 h-20 rounded-full bg-pink-500"
  tabindex="-1"
  role="button"
  ontouchstart={createHandler(true)}
  ontouchend={createHandler(false)}
></div>
