<script lang="ts">
  import type { Snippet } from "svelte"

  let {
    onclick,
    children,
    className = "bg-green-600 border-green-400 border-4 px-4 py-2 text-white",
  }: {
    onclick: () => void
    children: Snippet
    className?: string
  } = $props()
</script>

<button type="button" {onclick} class={className}>
  {@render children()}
</button>

<style>
  button {
    border-style: outset;

    &:active {
      border-style: inset;
    }
  }
</style>
