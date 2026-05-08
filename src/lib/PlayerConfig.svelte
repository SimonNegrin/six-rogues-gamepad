<script lang="ts">
  import type { PlayerPreset } from "../types"
  import Button from "./Button.svelte"
  import { sendData } from "./connection.svelte"
  import {
    MIN_CONFIGURABLE_HEALTH,
    PKT_PLAYER_ACCEPT,
    PKT_PLAYER_CONFIG,
  } from "./contants"
  import FullScreenBtn from "./FullScreenBtn.svelte"
  import InputText from "./InputText.svelte"
  import { playerPresets } from "./players"
  import SpriteRogue from "./SpriteRogue.svelte"
  import StatCtrl from "./StatCtrl.svelte"
  import { globalState } from "./state.svelte"

  type ConfigurableStat = keyof Pick<
    PlayerPreset,
    "attack" | "defence" | "movement" | "actions" | "aim" | "magic" | "health"
  >

  const FIRST_LEVEL_COST = 2

  const statCost: Record<ConfigurableStat, number> = {
    attack: 1,
    defence: 1,
    movement: 1,
    actions: 2,
    aim: 1,
    magic: 1,
    health: 1,
  }

  let presetIndex = $state(0)
  // svelte-ignore state_referenced_locally
  let preset: PlayerPreset = $state({ ...playerPresets[presetIndex] })

  $effect(() => {
    sendPreset(PKT_PLAYER_CONFIG, preset)
  })

  function sendPreset(pktType: number, preset: PlayerPreset): void {
    const encoder = new TextEncoder()
    const data = encoder.encode(JSON.stringify(preset))
    const pkt = new Uint8Array(1 + data.length)
    pkt[0] = pktType
    pkt.set(data, 1)
    sendData(pkt.buffer)
  }

  function nextPreset(): void {
    presetIndex = (presetIndex + 1) % playerPresets.length
    preset = structuredClone(playerPresets[presetIndex])
  }

  function decrementStat(stat: ConfigurableStat): void {
    if (preset[stat] === 0) return
    if (stat === "health" && preset[stat] <= MIN_CONFIGURABLE_HEALTH) return
    const newLevel = Math.max(0, preset[stat] - 1)
    const points = newLevel === 0 ? FIRST_LEVEL_COST : statCost[stat]
    preset[stat] = newLevel
    preset.points += points
  }

  function incrementStat(stat: ConfigurableStat): void {
    const points = preset[stat] === 0 ? FIRST_LEVEL_COST : statCost[stat]
    if (points <= preset.points) {
      preset[stat]++
      preset.points -= points
    }
  }

  function accept(): void {
    // Send the final player config to the game screen
    sendPreset(PKT_PLAYER_ACCEPT, preset)
    globalState.player = preset
    globalState.maxHealth = preset.health
    globalState.health = preset.health
  }
</script>

<div class="w-dvw h-dvh flex">
  <div
    class="w-1/4 h-full bg-mist-800 flex flex-col justify-evenly items-center overflow-hidden relative"
  >
    <div class="w-40 h-40 shrink-0 flex justify-center items-center">
      <div class="w-8 h-8 scale-500">
        <SpriteRogue name={preset.sprite} />
      </div>
    </div>

    <Button
      onclick={nextPreset}
      className="px-4 py-2 text-2xl bg-extra-dark-purple border-4 border-dark-gray text-mild-yellow-white"
      >Siguiente</Button
    >
  </div>
  <div class="w-3/4 h-full flex flex-col bg-mist-500">
    <div class="flex justify-between p-8">
      <InputText bind:value={preset.name} />

      {#if preset.points}
        <div class="text-2xl">
          {preset.points}
          {preset.points === 1 ? "punto restante" : "puntos restantes"}
        </div>
      {:else}
        <Button
          onclick={accept}
          className=" border-4 bg-dark-yellow-green border-yellow-green text-mild-yellow-white px-4 py-1 text-2xl"
          >Aceptar</Button
        >
      {/if}
    </div>

    <div class="p-8 pt-0 grid grid-rows-3 grid-cols-3 gap-4">
      <div>
        <div class="text-xl">Movimiento</div>
        <StatCtrl
          stat={preset.movement}
          ondecrement={() => decrementStat("movement")}
          onincrement={() => incrementStat("movement")}
          item="leather boots"
        />
      </div>

      <div>
        <div class="text-xl">Acciones</div>
        <StatCtrl
          stat={preset.actions}
          ondecrement={() => decrementStat("actions")}
          onincrement={() => incrementStat("actions")}
          item="leather gloves"
        />
      </div>

      <div>
        <div class="text-xl">Salud</div>
        <StatCtrl
          stat={preset.health}
          ondecrement={() => decrementStat("health")}
          onincrement={() => incrementStat("health")}
          item="apple"
        />
      </div>

      <div>
        <div class="text-xl">Ataque</div>
        <StatCtrl
          stat={preset.attack}
          ondecrement={() => decrementStat("attack")}
          onincrement={() => incrementStat("attack")}
          item="short sword"
        />
      </div>

      <div>
        <div class="text-xl">Defensa</div>
        <StatCtrl
          stat={preset.defence}
          ondecrement={() => decrementStat("defence")}
          onincrement={() => incrementStat("defence")}
          item="buckler"
        />
      </div>

      <div>
        <div class="text-xl">Puntería</div>
        <StatCtrl
          stat={preset.aim}
          ondecrement={() => decrementStat("aim")}
          onincrement={() => incrementStat("aim")}
          item="arrows"
        />
      </div>

      <div>
        <div class="text-xl">Magia</div>
        <StatCtrl
          stat={preset.magic}
          ondecrement={() => decrementStat("magic")}
          onincrement={() => incrementStat("magic")}
          item="wide-brimmed hat"
        />
      </div>

      <div class="col-start-3 self-end flex justify-end">
        <FullScreenBtn />
      </div>
    </div>
  </div>
</div>
