import SignalingConnection from "./SignalingConnection"

const ICE_SERVERS: RTCIceServer[] = [
  {
    urls: "stun:stun.relay.metered.ca:80",
  },
  {
    urls: "turn:global.relay.metered.ca:80",
    username: "a0240ef79f4aab6adcbcd492",
    credential: "sivvkdvgYch7X1z4",
  },
  {
    urls: "turn:global.relay.metered.ca:80?transport=tcp",
    username: "a0240ef79f4aab6adcbcd492",
    credential: "sivvkdvgYch7X1z4",
  },
  {
    urls: "turn:global.relay.metered.ca:443",
    username: "a0240ef79f4aab6adcbcd492",
    credential: "sivvkdvgYch7X1z4",
  },
  {
    urls: "turns:global.relay.metered.ca:443?transport=tcp",
    username: "a0240ef79f4aab6adcbcd492",
    credential: "sivvkdvgYch7X1z4",
  },
]

export const CONN_CLOSED = "CONN_CLOSED"
export const CONN_OPENNING = "CONN_OPENNING"
export const CONN_OPEN = "CONN_OPEN"
export const CONN_ERROR = "CONN_ERROR"

export type ConnStatus =
  | typeof CONN_CLOSED
  | typeof CONN_OPENNING
  | typeof CONN_OPEN
  | typeof CONN_ERROR

export const connection = $state<{
  status: ConnStatus
}>({
  status: CONN_CLOSED,
})

let peerConnection: RTCPeerConnection | undefined
let signalingConnection: SignalingConnection | undefined
let dataChannel: RTCDataChannel | undefined

export async function connect(roomId: string): Promise<void> {
  if (![CONN_CLOSED, CONN_ERROR].includes(connection.status)) {
    throw new Error("Connection is not closed")
  }

  connection.status = CONN_OPENNING

  signalingConnection = new SignalingConnection(
    import.meta.env.VITE_SIGNALING_SERVER,
  )

  signalingConnection.on("offer", onOffer)
  signalingConnection.on("candidate", onRemoteCandidate)
  signalingConnection.on("disconnect", onSignalingDisconnect)

  await signalingConnection.connect()
  signalingConnection.joinRoom(roomId)
}

export function sendData(data: ArrayBuffer): void {
  if (connection.status !== CONN_OPEN) {
    throw new Error("Connection is not open")
  }
  dataChannel!.send(data)
}

async function onOffer(offer: RTCSessionDescriptionInit): Promise<void> {
  console.log(`Offer received`, offer)

  peerConnection = new RTCPeerConnection({
    iceServers: ICE_SERVERS,
  })

  peerConnection.addEventListener("icecandidate", (event) => {
    if (event.candidate !== null) {
      signalingConnection!.sendCandidate(event.candidate)
    }
  })

  peerConnection.addEventListener("datachannel", (event) => {
    dataChannel = event.channel

    dataChannel.addEventListener("open", () => {
      console.log("Data channel open")
      signalingConnection?.disconnect()
      signalingConnection = undefined
      connection.status = CONN_OPEN
    })

    dataChannel.addEventListener("error", (event) => {
      console.error(`RTCErrorEvent: ${event.error}`)
      connection.status = CONN_ERROR
      clearConnection()
    })
  })

  await peerConnection.setRemoteDescription(offer)
  const answer = await peerConnection.createAnswer()
  await peerConnection.setLocalDescription(answer)
  signalingConnection!.sendAnswer(answer)
}

async function onRemoteCandidate(
  candidate: RTCIceCandidateInit,
): Promise<void> {
  console.log("Remote ICE candidate received")
  await peerConnection!.addIceCandidate(candidate)
}

function onSignalingDisconnect(): void {
  console.log("Signaling disconnected")
}

function clearConnection(): void {
  peerConnection?.close()
  signalingConnection?.disconnect()
  dataChannel?.close()
  peerConnection = undefined
  signalingConnection = undefined
  dataChannel = undefined
}
