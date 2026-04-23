<script lang="ts">
  import type { Snippet } from "svelte"

  let {
    children,
  }: {
    children: Snippet
  } = $props()
</script>

<div
  class="w-full h-full flex flex-col gap-4 justify-center items-center text-white"
>
  {@render children()}
</div>
