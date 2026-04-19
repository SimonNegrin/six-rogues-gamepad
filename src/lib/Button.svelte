<script lang="ts">
  import type { Snippet } from "svelte"

  let {
    onclick,
    children,
    className,
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
