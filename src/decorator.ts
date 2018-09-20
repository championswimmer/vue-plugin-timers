import { createDecorator } from 'vue-class-component'

export interface TimerDecoratorOptions {
  interval?: number
  repeat?: true
  args?: () => any
}
let Timer: ((opts: TimerDecoratorOptions) => MethodDecorator) | undefined

// @ts-ignore
if (process.env.MODULE_FORMAT !== 'umd') {
  Timer = (opt: TimerDecoratorOptions) =>
    createDecorator((options, key) => {
      if (!options.timers) {
        options.timers = {}
      }
      options.timers[key] = {
        interval: opt.interval || 1000,
        repeat: opt.repeat || false,
        args: opt.args
      }
    })
}
export { Timer }
