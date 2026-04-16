<script lang="ts">
  import type { JoystickState, Point } from "../types"

  let {
    onchange,
  }: {
    onchange: (state: JoystickState) => void
  } = $props()

  const THRESHOLD = 35

  let lastState: JoystickState = {
    top: false,
    right: false,
    bottom: false,
    left: false,
  }
  let center: Point = $state({ x: 0, y: 0 })

  function handleTouch(event: TouchEvent): void {
    const target = event.currentTarget as HTMLDivElement
    const rect = target.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const [touch] = event.touches
    const x = touch.clientX - centerX
    const y = touch.clientY - centerY
    const radius = Math.hypot(x, y)

    if (radius < THRESHOLD) {
      center.x = 0
      center.y = 0
      return
    }

    center.x = x
    center.y = y

    const state = angleToState(Math.atan2(y, x))

    if (isEqualState(state, lastState)) {
      return
    }

    lastState = state
    onchange(state)
  }

  function isEqualState(a: JoystickState, b: JoystickState): boolean {
    return (
      a.top === b.top &&
      a.bottom === b.bottom &&
      a.left === b.left &&
      a.right === b.right
    )
  }

  function angleToState(rad: number): JoystickState {
    let deg = (rad * 180) / Math.PI
    deg = (deg + 360) % 360
    deg = (deg + 22.5 + 360) % 360
    const state: JoystickState = {
      top: false,
      right: false,
      bottom: false,
      left: false,
    }

    if (deg < 45) {
      state.right = true
    } else if (deg < 90) {
      state.right = true
      state.bottom = true
    } else if (deg < 135) {
      state.bottom = true
    } else if (deg < 180) {
      state.left = true
      state.bottom = true
    } else if (deg < 225) {
      state.left = true
    } else if (deg < 270) {
      state.left = true
      state.top = true
    } else if (deg < 315) {
      state.top = true
    } else {
      state.top = true
      state.right = true
    }

    return state
  }

  function ontouchend(): void {
    center.x = 0
    center.y = 0
    onchange({
      top: false,
      right: false,
      bottom: false,
      left: false,
    })
  }
</script>

<div
  class="w-full h-full rounded-full bg-indigo-200 flex justify-center items-center"
  tabindex="-1"
  role="button"
  ontouchstart={handleTouch}
  ontouchmove={handleTouch}
  {ontouchend}
>
  <!-- center -->
  <div
    class="w-24 h-24 rounded-full duration-100 bg-indigo-500"
    style:transform="translate({center.x}px, {center.y}px)"
  ></div>
</div>
