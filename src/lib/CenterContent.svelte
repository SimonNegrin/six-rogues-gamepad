<script lang="ts">
  import type { Snippet } from "svelte"

  let {
    children,
  }: {
    children: Snippet
  } = $props()
</script>

<div
  class="w-full h-full flex flex-col gap-4 justify-evenly items-center text-mild-yellow-white"
>
  {@render children()}
</div>
