# Six Rogues Gamepad

**Six Rogues Gamepad** es un gamepad virtual que se ejecuta en el navegador del móvil y se conecta de forma remota a un juego para que puedas configurar y controlar tu personaje en tiempo real.

> 🚧 **Estado del proyecto:** En desarrollo activo.

## ¿Cómo funciona?

1. **Conectar** — Escanea o introduce el código de sala para establecer una conexión peer-to-peer con el juego mediante WebRTC.
2. **Configurar personaje** — Elige entre distintos arquetipos (guerrero, mago, pícaro, etc.) y personaliza sus estadísticas: ataque, defensa, movimiento, acciones, puntería, magia y salud.
3. **Esperar jugadores** — Una vez listo, espera a que el resto de jugadores confirmen su preparación.
4. **Jugar** — Cuando comienza la partida, usa el gamepad táctil para controlar a tu personaje: joystick direccional y botones de acción.

## Características

- **Conexión remota en tiempo real** — Comunicación directa entre dispositivos vía WebRTC con señalización mediante WebSocket.
- **Gamepad táctil** — Joystick de 8 direcciones y 4 botones de acción con iconos de objetos.
- **Configuración de personaje** — 8 clases predefinidas con estadísticas personalizables mediante un sistema de puntos.
- **Sprites pixel-art** — Personajes e items con spritesheets estilo retro.
- **Multijugador por turnos** — Soporte para partidas con múltiples jugadores, cada uno con su turno.

## Tecnologías

- [Svelte 5](https://svelte.dev/) — Framework de interfaz de usuario.
- [TypeScript](https://www.typescriptlang.org/) — Tipado estático.
- [Vite](https://vitejs.dev/) — Bundler y entorno de desarrollo.
- [Tailwind CSS 4](https://tailwindcss.com/) — Estilos utilitarios.
- [WebRTC](https://webrtc.org/) — Comunicación peer-to-peer.
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) — Señalización para establecer conexiones WebRTC.

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Vista previa de la build
pnpm preview
```

## Variables de entorno

| Variable                | Descripción                                |
| ----------------------- | ------------------------------------------ |
| `VITE_SIGNALING_SERVER` | URL del servidor de señalización WebSocket |

## Licencia

Este proyecto es privado y está en desarrollo.
