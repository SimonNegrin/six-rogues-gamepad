<script lang="ts">
  import Button from "./Button.svelte"
  import CenterContent from "./CenterContent.svelte"
  import { sendData } from "./connection.svelte"
  import { PKT_PLAYER_READY } from "./contants"

  function sendReady(): void {
    const pkt = new Uint8Array(1)
    pkt[0] = PKT_PLAYER_READY
    sendData(pkt.buffer)
  }
</script>

<CenterContent>
  <div>Waiting other players</div>
  <Button onclick={sendReady}>I'm ready</Button>
</CenterContent>
