import { ComponentOptions } from 'vue'
import { Vue, VueConstructor } from 'vue/types/vue'
import ComponentTimer from './ComponentTimer'
import { VueClass } from 'vue-class-component/lib/declarations'

const findTimerByName = function(timers: ComponentTimer[], timerName: string) {
  const timer = timers.filter((timer) => timer.methodName === timerName).shift()

  if (!timer) {
    throw new Error(`ERR_TIMER_NOT_FOUND: Name of timer '${timerName}' does not exists`)
  }

  return timer
}

export default {
  data() {
    if (!this.$options.timers) {
      return {}
    } else {
      return {
        timers: Object.keys(this.$options.timers).map(
          (key) =>
            new ComponentTimer(
              key,
              this.$options.timers![key].interval,
              this.$options.timers![key].repeat,
              this.$options.timers![key].args
            )
        )
      }
    }
  },
  created() {
    if (!this.timers) return
    let vm = this as Vue
    let timers = this.timers
    timers.forEach((timer) => timer.setVM(vm))
    // @ts-ignore
    vm.$timers = {
      startByName: (timerName: string) => {
        const timer = findTimerByName(timers, timerName)
        timer.start()
      },
      start: () => {
        timers.forEach((timer) => {
          console.log(`start: ${timer.methodName} ${timer.state}`)
          timer.start()
        })
      },
      stopByName: (timerName: string) => {
        const timer = findTimerByName(timers, timerName)
        timer.start()
      },
      stop: () => {
        timers.forEach((timer) => {
          console.log(`stop: ${timer.methodName} ${timer.state}`)
          timer.stop()
        })
      }
    }
  },
  mounted() {
    if (!this.timers) {
      return
    }
    this.$timers.start()
  },
  beforeDestroy() {
    if (!this.timers) {
      return
    }
    this.$timers.stop()
  }
} as typeof Vue & Vue & ComponentOptions<Vue> & { timers: ComponentTimer[] }
