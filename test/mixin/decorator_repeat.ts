import Component, { mixins } from 'vue-class-component'
// @ts-ignore
import Vue from 'vue/dist/vue'
import { expect } from 'chai'
// @ts-ignore
import jsdomGlobal from 'jsdom-global'
import { VueTimersMixin, Timer } from '../..'

jsdomGlobal()
Vue.config.productionTip = false

@Component({
  render: (createElement) => createElement('div')
})
class TimerComponent extends mixins(VueTimersMixin) {
  count = 0

  @Timer({ interval: 200, repeat: true })
  incr() {
    this.count++
  }
}
let timerComponent: TimerComponent

describe('@Timer {repeat: true}', () => {
  beforeEach(() => {
    timerComponent = new TimerComponent()
  })
  it('component timer ticks once', (done) => {
    timerComponent.$mount()
    setTimeout(() => {
      expect(timerComponent.count).to.eq(2)
      timerComponent.$timers.stop()
      done()
    }, 500)
  })
  it('component timer is stopped by name', (done) => {
    const timerName = 'incr'
    timerComponent.$mount()
    setTimeout(() => {
      timerComponent.$timers.stopByName(timerName)
      expect(timerComponent.$timers.isTimerRunning(timerName)).to.be.false
      done()
    }, 500)
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
    }, 500)
  })
  afterEach(() => {
    timerComponent.$destroy()
  })
})
