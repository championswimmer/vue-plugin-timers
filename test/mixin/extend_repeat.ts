import Vue from 'vue'
import { expect } from 'chai'
// @ts-ignore
import jsdomGlobal from 'jsdom-global'
import { VueTimersMixin } from '../..'

jsdomGlobal()

Vue.config.productionTip = false

let timerComponent: Vue & { count: number }

describe('ComponentOptions.timers {repeat: true}', () => {
  beforeEach(() => {
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
        incr: { interval: 200, repeat: true }
      }
    })
    TimerComponent.mixin(VueTimersMixin)
    timerComponent = new TimerComponent()
  })

  it('component timer ticks multiple times', (done) => {
    timerComponent.$mount()
    setTimeout(() => {
      expect(timerComponent.count).to.eq(5)
      done()
    }, 1100)
  })
  it('component timer is stopped by name', (done) => {
    const timerName = 'incr'
    timerComponent.$mount()
    setTimeout(() => {
      timerComponent.$timers.stopByName(timerName)
      expect(timerComponent.$timers.isTimerRunning(timerName)).to.be.false
      done()
    }, 1100)
  })
  it('component timer is restarted by name', (done) => {
    const timerName = 'incr'
    timerComponent.$mount()
    setTimeout(() => {
      timerComponent.$timers.stopByName(timerName)
      expect(timerComponent.$timers.isTimerRunning(timerName)).to.be.false
      timerComponent.$timers.startByName(timerName)
      expect(timerComponent.$timers.isTimerRunning(timerName)).to.be.true
      done()
    }, 1100)
  })
  afterEach(() => {
    timerComponent.$destroy()
  })
})
