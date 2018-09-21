import Component, { mixins } from 'vue-class-component'
// @ts-ignore
import Vue from 'vue/dist/vue'
import { expect } from 'chai'
// @ts-ignore
import jsdomGlobal from 'jsdom-global'
import { VueTimersMixin, Timer } from '..'

jsdomGlobal()
Vue.prototype.productionTip = false
let timerComponent: Vue
before(() => {
  @Component({
    render: (createElement) => createElement('div')
  })
  class TimerComponent extends mixins(VueTimersMixin as Vue) {
    count = 0

    @Timer({ interval: 200 })
    incr() {
      this.count++
    }
  }
  timerComponent = new TimerComponent()
})

describe('decorated timer with repeat = false', () => {
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
