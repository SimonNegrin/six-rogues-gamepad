<script lang="ts">
  let {
    stat,
    onincrement,
    ondecrement,
  }: {
    stat: number
    onincrement: () => void
    ondecrement: () => void
  } = $props()
</script>

<div class="flex text-4xl">
  <button
    type="button"
    class="w-12 h-12 bg-green-600 border-4 border-green-400"
    onclick={ondecrement}
  >
    -
  </button>
  <div class="w-22 flex justify-center items-center bg-green-200">
    {stat}
  </div>
  <button
    type="button"
    class="w-12 h-12 border-4 border-green-400 bg-green-600"
    onclick={onincrement}
  >
    +
  </button>
</div>

<style>
  button {
    border-style: outset;

    &:active {
      border-style: inset;
    }
  }
</style>
