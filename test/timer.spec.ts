import Vue from 'vue/dist/vue'
import { expect } from 'chai'
import jsdomGlobal from 'jsdom-global'
import { ComponentOptions } from 'vue/types/options'
import { VueTimersMixin } from '..'

jsdomGlobal()

Vue.mixin(VueTimersMixin)
const TimerComponent = new Vue({
  template: `<div><span>something</span></div>`,
  data() {
    return {
      count: 0
    }
  },
  methods: {
    incr() {
      this.count++
    }
  },
  timers: {
    incr: { interval: 200, repeat: true }
  }
} as ComponentOptions<any>).$mount()

describe('basic component timers', () => {
  it('component timer ticks', (done) => {
    setTimeout(() => {
      expect(TimerComponent.count).to.eq(5)
      TimerComponent.$timers.stop()
      done()
    }, 1100)
  })
})
