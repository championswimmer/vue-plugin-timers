import { ComponentOptions } from 'vue'
import { Vue, VueConstructor } from 'vue/types/vue'
import ComponentTimer from './ComponentTimer'
import { VueClass } from 'vue-class-component/lib/declarations'

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
      start: () => {
        timers.forEach((timer) => {
          console.log(`start: ${timer.methodName} ${timer.state}`)
          timer.start()
        })
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
