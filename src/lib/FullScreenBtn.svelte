<script lang="ts">
  import Button from "./Button.svelte"
  import { globalState } from "./state.svelte"

  let text = $state("Full screen")

  async function onclick(): Promise<void> {
    console.log("onclick")
    globalState.isFullScreen = !globalState.isFullScreen
    if (globalState.isFullScreen) {
      text = "Exit full screen"
      await document.body.requestFullscreen()
    } else {
      text = "Full screen"
      await document.exitFullscreen()
    }
  }
</script>

<Button {onclick}>{text}</Button>
