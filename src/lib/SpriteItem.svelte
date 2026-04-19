<script lang="ts">
  import spritesheet from "../assets/spritesheets/items.png"
  import rogues from "../assets/spritesheets/items.json"
  import Sprite from "./Sprite.svelte"

  export type ItemSpriteName = keyof typeof rogues

  let {
    name,
    invert,
    scale,
  }: {
    name: ItemSpriteName
    invert?: boolean
    scale?: number
  } = $props()
</script>

<Sprite pos={rogues[name]} {spritesheet} {invert} {scale} />
