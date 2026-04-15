<script lang="ts">
  import type { JoystickState } from "../types"

  let {
    onchange,
  }: {
    onchange: (state: JoystickState) => void
  } = $props()

  const THRESHOLD = 30

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
      return
    }

    const state = angleToState(Math.atan2(y, x))
    onchange(state)
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
    onchange({
      top: false,
      right: false,
      bottom: false,
      left: false,
    })
  }
</script>

<div
  class="w-full h-full bg-indigo-500 flex justify-center items-center"
  tabindex="-1"
  role="button"
  ontouchstart={handleTouch}
  ontouchmove={handleTouch}
  {ontouchend}
>
  <!-- center -->
  <div class="w-5 h-5 rounded-full bg-red-500"></div>
</div>
