<script lang="ts" module>
  import spritesheet from "../assets/spritesheets/rogues.png"
  import rogues from "../assets/spritesheets/rogues.json"

  export type RogueSpriteName = keyof typeof rogues

  export const rogueNames = Object.keys(rogues) as RogueSpriteName[]
</script>

<script lang="ts">
  import Sprite from "./Sprite.svelte"

  let {
    name,
    invert,
  }: {
    name: RogueSpriteName
    invert?: boolean
  } = $props()
</script>

<Sprite pos={rogues[name]} {spritesheet} {invert} />
