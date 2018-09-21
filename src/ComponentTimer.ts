import { Vue } from 'vue/types/vue'

export type TimerState = 'created' | 'running' | 'expired' | 'stopped'
export default class ComponentTimer {
  repeat = false
  interval = 1000
  timerId: NodeJS.Timer | number = -1
  vm!: Vue
  methodName: string
  state: TimerState
  method!: Function
  args?: () => []

  start() {
    if (this.state === 'running' || this.state === 'expired') {
      return
    }
    if (this.repeat) {
      this.timerId = setInterval(() => {
        this.args ? this.method(...this.args()) : this.method()
      }, this.interval)
      this.state = 'running'
    } else {
      this.timerId = setTimeout(() => {
        this.args ? this.method(...this.args()) : this.method()
        this.state = 'expired'
      }, this.interval)
      this.state = 'running'
    }
  }
  stop() {
    if (this.repeat) {
      clearInterval(this.timerId as number)
    } else {
      clearTimeout(this.timerId as number)
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
    if (!(this.vm as any)[this.methodName]) {
      throw new Error('ERR_METHOD_NOT_FOUND: Method name in timer is probably wrong')
    }
    this.method = ((this.vm as any)[this.methodName] as Function).bind(this.vm)
    if (this.args) {
      this.args = this.args.bind(this.vm)
    }
  }
}
