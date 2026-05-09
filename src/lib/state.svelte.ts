// -ConnectionState
//  - ConnectionNotConnected
//  - ConnectionSignaling
//  - ConnectionReady
//   - PlayerConfig
//   - PlayerReady
//     - WaitingPlayers
//     - InGame
//       - MyTurn
//         - Gamepad
//       - WaitingMyTurn

import type { PlayerPreset } from "../types"

interface GlobalState {
  player?: PlayerPreset
  canCastMagic: boolean
  inGame: boolean
  myTurn: boolean
  isFullScreen: boolean
  health: number
  maxHealth: number
}

export const globalState: GlobalState = $state({
  inGame: false,
  myTurn: false,
  isFullScreen: false,
  canCastMagic: false,
  health: 0,
  maxHealth: 0,
})
