export default class ComponentTimer {
  repeat = false
  interval = 1000
  timerId = -1
  handler: Function

  start() {
    if (this.repeat) {
      this.timerId = setInterval(this.handler, this.interval)
    } else {
      this.timerId = setTimeout(this.handler, this.interval)
    }
  }
  stop() {
    if (this.repeat) {
      clearInterval(this.timerId)
    } else {
      clearTimeout(this.timerId)
    }
  }

  constructor(handler: Function, interval: number, repeat: boolean) {
    this.repeat = repeat
    this.interval = interval
    this.handler = handler
  }
}
