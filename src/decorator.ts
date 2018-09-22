import { createDecorator, VueDecorator } from 'vue-class-component'

export interface TimerDecoratorOptions {
  interval?: number
  repeat?: true
  args?: () => any
}
let Timer: (opt: TimerDecoratorOptions) => VueDecorator

function timerDecorator(opt: TimerDecoratorOptions) {
  return createDecorator((options, key) => {
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
// @ts-ignore
if (process.env.MODULE_FORMAT !== 'umd') {
  Timer = timerDecorator
}
export { Timer }
