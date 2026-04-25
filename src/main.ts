import { mount } from "svelte"
import "./app.css"
import App from "./App.svelte"
import { onPkt } from "./lib/connection.svelte"
import {
  PKT_DISABLE_TURN,
  PKT_ENABLE_TURN,
  PKT_GAME_START,
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

const app = mount(App, {
  target: document.getElementById("app")!,
})

export default app
