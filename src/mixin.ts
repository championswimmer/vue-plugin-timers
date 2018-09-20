import { ComponentOptions } from 'vue'
import { Vue, VueConstructor } from 'vue/types/vue'
import ComponentTimer from './ComponentTimer'

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
    this.timers.forEach((timer) => timer.setVM(vm))
    // @ts-ignore
    vm.$timers = {
      start: () => {
        this.timers.forEach((timer) => {
          timer.start()
        })
      },
      stop: () => {
        this.timers.forEach((timer) => {
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
    if (!this.$options.timers) {
      return
    }
    this.$timers.stop()
  }
} as Vue & ComponentOptions<Vue> & { timers: ComponentTimer[] }
