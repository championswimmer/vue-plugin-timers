import { ComponentOptions } from 'vue'
import { Vue } from 'vue/types/vue'

export default {
  data() {
    if (!this.$options.timers) {
      return {}
    } else {
      return { timers: Object.keys(this.$options.timers) }
    }
  }
} as ComponentOptions<Vue>
