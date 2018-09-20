import Vue from 'vue/dist/vue'
import { expect } from 'chai'
import jsdomGlobal from 'jsdom-global'
import { ComponentOptions } from 'vue/types/options'
import { VueTimersMixin } from '..'

jsdomGlobal()
let timerComponent: Vue
before(() => {
  const TimerComponent = Vue.extend({
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
      incr: { interval: 200, repeat: false }
    }
  })
  TimerComponent.mixin(VueTimersMixin)
  timerComponent = new TimerComponent()
})

describe('timer with repeat = false', () => {
  it('component timer ticks once', (done) => {
    timerComponent.$mount()
    setTimeout(() => {
      expect(timerComponent.count).to.eq(1)
      timerComponent.$timers.stop()
      done()
    }, 500)
  })
})

after(() => {
  timerComponent.$destroy()
})
