import type { RogueSpriteName } from "./lib/SpriteRogue.svelte"

export interface Point {
  x: number
  y: number
}

export interface JoystickState {
  top: boolean
  right: boolean
  bottom: boolean
  left: boolean
}

export interface GamepadState {
  joystick: JoystickState
  abtn: boolean
  bbtn: boolean
  cbtn: boolean
  dbtn: boolean
}

export interface PlayerPreset {
  sprite: RogueSpriteName
  name: string
  genre: "male" | "female"
  points: number
  movement: number
  actions: number
  attack: number
  defence: number
  aim: number
  magic: number
}
