<script lang="ts">
  import type { Snippet } from "svelte"
  import type { ItemSpriteName } from "./SpriteItem.svelte"
  import SpriteItem from "./SpriteItem.svelte"

  let {
    stat,
    onincrement,
    ondecrement,
    item,
  }: {
    stat: number
    onincrement: () => void
    ondecrement: () => void
    item: ItemSpriteName
  } = $props()
</script>

<div class="flex text-4xl">
  <button
    type="button"
    class="w-12 h-12 bg-dark-yellow-green border-4 border-yellow-green"
    onclick={ondecrement}
  >
    -
  </button>
  <div class="w-22 flex justify-evenly items-center bg-extra-dark-green">
    <SpriteItem name={item} scale={1.5} />
    <div>
      {stat}
    </div>
  </div>
  <button
    type="button"
    class="w-12 h-12 border-4 border-yellow-green bg-dark-yellow-green"
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
