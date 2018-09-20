import { Vue } from 'vue/types/vue'

export type TimerState = 'created' | 'running' | 'expired' | 'stopped'
export default class ComponentTimer {
  repeat = false
  interval = 1000
  timerId = -1
  vm: Vue
  methodName: string
  state: TimerState
  method: Function
  args?: () => []

  start() {
    if (this.repeat) {
      this.timerId = window.setInterval(() => {
        this.args ? this.method(...this.args()) : this.method()
      }, this.interval)
      this.state = 'running'
    } else {
      this.timerId = window.setTimeout(() => {
        this.args ? this.method(...this.args()) : this.method()
        this.state = 'expired'
      }, this.interval)
    }
  }
  stop() {
    if (this.repeat) {
      clearInterval(this.timerId)
    } else {
      clearTimeout(this.timerId)
    }
    this.state = 'stopped'
  }

  constructor(
    methodName: string,
    interval: number = 1000,
    repeat: boolean = false,
    args?: <V extends Vue>(this: V) => []
  ) {
    this.repeat = repeat
    this.interval = interval
    this.methodName = methodName
    this.state = 'created'
    this.args = args
  }
  setVM(vm: Vue) {
    this.vm = vm
    this.method = ((this.vm as any)[this.methodName] as Function).bind(this.vm)
    if (this.args) {
      this.args = this.args.bind(this.vm)
    }
  }
}
