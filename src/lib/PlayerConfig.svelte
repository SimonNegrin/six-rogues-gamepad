<script lang="ts">
  import type { PlayerPreset } from "../types"
  import Button from "./Button.svelte"
  import { playerPresets } from "./players"
  import SpriteRogue from "./SpriteRogue.svelte"
  import StatCtrl from "./StatCtrl.svelte"

  type ConfigurableStat = keyof Pick<
    PlayerPreset,
    "attack" | "defence" | "movement" | "actions" | "aim" | "magic"
  >

  let presetIndex = $state(0)
  // svelte-ignore state_referenced_locally
  let preset: PlayerPreset = $state({ ...playerPresets[presetIndex] })
  let pointsLeft: number = $derived(preset.statPoints - calcUsedPoints(preset))

  function calcUsedPoints(preset: PlayerPreset): number {
    return (
      preset.movement +
      preset.actions +
      preset.attack +
      preset.defence +
      preset.aim +
      preset.magic
    )
  }

  function nextPreset(): void {
    presetIndex = (presetIndex + 1) % playerPresets.length
    preset = { ...playerPresets[presetIndex] }
  }

  function decrementStat(stat: ConfigurableStat): void {
    preset[stat] = Math.max(0, preset[stat] - 1)
  }

  function incrementStat(stat: ConfigurableStat): void {
    const usedPoints = calcUsedPoints(preset)
    if (usedPoints < preset.statPoints) {
      preset[stat]++
    }
  }
</script>

<div class="w-dvw h-dvh flex">
  <div
    class="w-1/4 h-full bg-amber-400 flex flex-col justify-evenly items-center overflow-hidden relative"
  >
    <div class="w-40 h-40 shrink-0 flex justify-center items-center">
      <div class="w-8 h-8 scale-500">
        <SpriteRogue name={preset.sprite} />
      </div>
    </div>

    <Button
      onclick={nextPreset}
      className="px-4 py-2 text-2xl bg-blue-600 border-4 border-blue-400 text-white"
      >Siguiente</Button
    >
  </div>
  <div class="w-3/4 h-full flex flex-col bg-amber-500 text-4xl">
    <div class="flex justify-between p-8">
      <input type="text" class="w-65 bg-amber-50" bind:value={preset.name} />

      <div>
        {pointsLeft} puntos
      </div>
    </div>

    <div class="p-8 grid grid-rows-3 grid-cols-2 gap-8">
      <StatCtrl
        stat={preset.attack}
        ondecrement={() => decrementStat("attack")}
        onincrement={() => incrementStat("attack")}
      />

      <StatCtrl
        stat={preset.defence}
        ondecrement={() => decrementStat("defence")}
        onincrement={() => incrementStat("defence")}
      />

      <StatCtrl
        stat={preset.movement}
        ondecrement={() => decrementStat("movement")}
        onincrement={() => incrementStat("movement")}
      />
      <StatCtrl
        stat={preset.actions}
        ondecrement={() => decrementStat("actions")}
        onincrement={() => incrementStat("actions")}
      />
      <StatCtrl
        stat={preset.aim}
        ondecrement={() => decrementStat("aim")}
        onincrement={() => incrementStat("aim")}
      />
      <StatCtrl
        stat={preset.magic}
        ondecrement={() => decrementStat("magic")}
        onincrement={() => incrementStat("magic")}
      />
    </div>
  </div>
</div>
