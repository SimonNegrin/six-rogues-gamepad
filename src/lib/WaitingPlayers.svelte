<script lang="ts">
  import Button from "./Button.svelte"
  import CenterContent from "./CenterContent.svelte"
  import { sendData } from "./connection.svelte"
  import { PKT_PLAYER_READY } from "./contants"
  import FullScreenBtn from "./FullScreenBtn.svelte"

  let imReady = $state(false)

  function sendReady(): void {
    if (imReady) return
    imReady = true
    const pkt = new Uint8Array([PKT_PLAYER_READY])
    sendData(pkt.buffer)
  }
</script>

<CenterContent>
  {#if imReady}
    <div>Waiting other players</div>
  {:else}
    <Button onclick={sendReady}>I'm ready</Button>
  {/if}

  <FullScreenBtn />
</CenterContent>
