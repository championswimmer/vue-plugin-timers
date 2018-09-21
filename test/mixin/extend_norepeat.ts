import Vue from 'vue'
import { expect } from 'chai'
// @ts-ignore
import jsdomGlobal from 'jsdom-global'
import { VueTimersMixin } from '../..'

jsdomGlobal()

Vue.config.productionTip = false

let timerComponent: Vue & { count: number }

describe('ComponentOptions.timers {repeat: false}', () => {
  before(() => {
    const TimerComponent = Vue.extend({
      render: (h) => h('div'),
      data() {
        return {
          count: 0
        }
      },
      methods: {
        incr(this: { count: number }) {
          console.log('incr run')
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

  it('component timer ticks once', (done) => {
    timerComponent.$mount()
    setTimeout(() => {
      expect(timerComponent.count).to.eq(1)
      done()
    }, 800)
  })

  after(() => {
    timerComponent.$destroy()
  })
})
