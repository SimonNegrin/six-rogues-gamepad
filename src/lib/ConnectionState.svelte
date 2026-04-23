<script lang="ts">
  import type { Component } from "svelte"
  import { connection, type ConnStatus } from "./connection.svelte"
  import ConnectionReady from "./ConnectionReady.svelte"
  import ConnectionError from "./ConnectionError.svelte"
  import ConnectionSignaling from "./ConnectionSignaling.svelte"
  import ConnectionNotConnected from "./ConnectionNotConnected.svelte"

  const components: Record<ConnStatus, Component> = {
    CONN_CLOSED: ConnectionNotConnected,
    CONN_OPENNING: ConnectionSignaling,
    CONN_OPEN: ConnectionReady,
    CONN_ERROR: ConnectionError,
  }

  let RenderComponent = $derived(components[connection.status])
</script>

<RenderComponent />
