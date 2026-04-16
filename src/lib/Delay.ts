export default class Delay {
  private timeout?: number

  constructor(private delay: number) {}

  schedule(handler: () => void): void {
    this.cancel()
    this.timeout = setTimeout(handler, this.delay)
  }

  cancel(): void {
    clearTimeout(this.timeout)
  }
}
