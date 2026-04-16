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
