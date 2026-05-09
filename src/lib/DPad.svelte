<script lang="ts">
  import type { JoystickState } from "../types"

  let {
    onchange,
  }: {
    onchange: (state: JoystickState) => void
  } = $props()

  let lastState: JoystickState = {
    top: false,
    right: false,
    bottom: false,
    left: false,
  }

  function isEqualState(a: JoystickState, b: JoystickState): boolean {
    return (
      a.top === b.top &&
      a.bottom === b.bottom &&
      a.left === b.left &&
      a.right === b.right
    )
  }

  function setState(nextState: JoystickState): void {
    if (isEqualState(nextState, lastState)) {
      return
    }

    lastState = nextState
    onchange(nextState)
  }

  function activate(direction: keyof JoystickState): void {
    const nextState: JoystickState = {
      top: false,
      right: false,
      bottom: false,
      left: false,
    }

    nextState[direction] = true
    setState(nextState)
  }

  function deactivate(): void {
    setState({
      top: false,
      right: false,
      bottom: false,
      left: false,
    })
  }
</script>

<svg
  width="100%"
  height="100%"
  viewBox="0 0 600 600"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
  role="group"
>
  <g
    role="button"
    ontouchstart={(e) => {
      e.preventDefault()
      activate("bottom")
    }}
    ontouchend={(e) => {
      e.preventDefault()
      deactivate()
    }}
    tabindex="0"
  >
    <!-- Down -->
    <path
      d="M333.079,394.204L479.33,540.455C429.281,577.853 367.207,600 300,600C232.793,600 170.719,577.853 120.67,540.455L266.921,394.204C277.275,397.844 288.408,399.825 300,399.825C311.592,399.825 322.725,397.844 333.079,394.204Z"
      fill="#432142"
    />
    <polygon points="300,530 270,470 330,470" fill="#8eb89e" />
  </g>

  <g
    role="button"
    ontouchstart={(e) => {
      e.preventDefault()
      activate("top")
    }}
    tabindex="0"
    ontouchend={(e) => {
      e.preventDefault()
      deactivate()
    }}
  >
    <!-- Up -->
    <path
      d="M120.67,59.545C170.719,22.147 232.793,0 300,0C367.207,0 429.281,22.147 479.33,59.545L333.079,205.796C322.725,202.156 311.592,200.175 300,200.175C288.408,200.175 277.275,202.156 266.921,205.796L120.67,59.545Z"
      fill="#432142"
    />
    <polygon points="300,70 270,130 330,130" fill="#8eb89e" />
  </g>

  <g
    role="button"
    tabindex="0"
    ontouchstart={(e) => {
      e.preventDefault()
      activate("right")
    }}
    ontouchend={(e) => {
      e.preventDefault()
      deactivate()
    }}
  >
    <!-- Right -->
    <path
      d="M540.455,120.67C577.853,170.719 600,232.793 600,300C600,367.207 577.853,429.281 540.455,479.33L394.204,333.079C397.844,322.725 399.825,311.592 399.825,300C399.825,288.408 397.844,277.275 394.204,266.921L540.455,120.67Z"
      fill="#432142"
    />
    <polygon points="530,300 470,270 470,330" fill="#8eb89e" />
  </g>

  <g
    role="button"
    tabindex="0"
    ontouchstart={(e) => {
      e.preventDefault()
      activate("left")
    }}
    ontouchend={(e) => {
      e.preventDefault()
      deactivate()
    }}
  >
    <!-- Left -->
    <path
      d="M59.545,120.67L205.796,266.921C202.156,277.275 200.175,288.408 200.175,300C200.175,311.592 202.156,322.725 205.796,333.079L59.545,479.33C22.147,429.281 0,367.207 0,300C0,232.793 22.147,170.719 59.545,120.67Z"
      fill="#432142"
    />
    <polygon points="70,300 130,270 130,330" fill="#8eb89e" />
  </g>
</svg>
