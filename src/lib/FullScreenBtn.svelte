<script lang="ts">
  import Button from "./Button.svelte"
  import { globalState } from "./state.svelte"

  const enableText = "Full screen"
  const disableText = "Exit full screen"

  async function onclick(): Promise<void> {
    console.log("onclick")
    globalState.isFullScreen = !globalState.isFullScreen
    if (globalState.isFullScreen) {
      await document.body.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }
</script>

<Button {onclick}>{globalState.isFullScreen ? disableText : enableText}</Button>
