import { mount } from "svelte"
import "./app.css"
import App from "./App.svelte"
import { onPkt } from "./lib/connection.svelte"
import {
  PKT_DISABLE_TURN,
  PKT_ENABLE_TURN,
  PKT_GAME_START,
  PKT_PLAYER_HEALTH,
  PKT_PLAYER_STATE_SYNC,
} from "./lib/contants"
import { globalState } from "./lib/state.svelte"

onPkt(PKT_GAME_START, () => {
  globalState.inGame = true
})

onPkt(PKT_ENABLE_TURN, () => {
  globalState.myTurn = true
})

onPkt(PKT_DISABLE_TURN, () => {
  globalState.myTurn = false
})

onPkt(PKT_PLAYER_HEALTH, (pkt) => {
  globalState.health = pkt[1]
})

onPkt(PKT_PLAYER_STATE_SYNC, (pkt) => {
  const decoder = new TextDecoder()
  const state = JSON.parse(decoder.decode(pkt.slice(1)))
  globalState.player = {
    sprite: state.sprite,
    name: state.name,
    genre: state.genre,
    points: 0,
    movement: state.movement,
    health: state.health,
    maxHealth: state.maxHealth,
    actions: state.actions,
    attack: state.attack,
    defence: state.defence,
    aim: state.aim,
    magic: state.magic,
  }
  globalState.health = state.health
  globalState.maxHealth = state.maxHealth
  globalState.inGame = true
})

const app = mount(App, {
  target: document.getElementById("app")!,
})

export default app
