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
  inGame: boolean
  myTurn: boolean
  isFullScreen: boolean
}

export const globalState: GlobalState = $state({
  inGame: false,
  myTurn: false,
  isFullScreen: false,
})
