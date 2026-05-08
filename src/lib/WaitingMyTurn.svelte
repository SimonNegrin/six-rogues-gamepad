<script lang="ts">
  import CenterContent from "./CenterContent.svelte"
  import { globalState } from "./state.svelte"

  function calcHealth(health: number, maxHealth: number): number {
    if (maxHealth === 0) return 0
    return 100 * (health / maxHealth)
  }
</script>

<div class="w-dvw h-dvh bg-extra-dark-blue flex flex-col">
  <div class="h-12 shrink-0 flex items-center px-4 bg-extra-dark-blue/80">
    <div class="w-full h-4 bg-dark-gray border-2 border-extra-dark-blue rounded-sm overflow-hidden">
      <div
        class="h-full bg-tomato-red transition-all duration-200"
        style:width="{calcHealth(globalState.health, globalState.maxHealth)}%"
      ></div>
    </div>
    <span class="ml-2 text-sm text-mild-yellow-white font-bold shrink-0"
      >{globalState.health}/{globalState.maxHealth}</span
    >
  </div>
  <div class="flex-1 flex items-center justify-center">
    <CenterContent>
      <div>Waiting other players...</div>
    </CenterContent>
  </div>
</div>
