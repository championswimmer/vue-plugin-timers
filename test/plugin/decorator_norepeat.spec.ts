import Component from 'vue-class-component'
import VueTimers, { Timer } from '../..'
import { createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'

// @ts-ignore
const Vue = createLocalVue()
Vue.use(VueTimers)

@Component({ render: (h) => h('div') })
class FirstComponent extends Vue {
  count = 0

  @Timer({ interval: 200 })
  incr() {
    this.count++
  }
}

@Component({ render: (h) => h('div') })
class SecondComponent extends Vue {
  count = 0

  @Timer({ interval: 400 })
  incr() {
    this.count++
  }
}

describe('[Vue.use]: @Timer {repeat: false}', () => {
  let first: FirstComponent
  let second: SecondComponent
  beforeEach(() => {
    first = new FirstComponent()
    first.$mount()
    second = new SecondComponent()
    second.$mount()
  })
  it('both components timers work', (done) => {
    setTimeout(() => {
      expect(first.count).to.eq(1)
      expect(second.count).to.eq(1)
      done()
    }, 900)
  })
  it('component timer is stopped by name', (done) => {
    const timerName = 'incr'
    setTimeout(() => {
      first.$timers.stopByName(timerName)
      expect(first.$timers.isTimerRunning(timerName)).to.be.false
      done()
    }, 1100)
  })
  it('component timer is restarted by name', (done) => {
    const timerName = 'incr'
    setTimeout(() => {
      first.$timers.stopByName(timerName)
      expect(first.$timers.isTimerRunning(timerName)).to.be.false
      first.$timers.startByName(timerName)
      expect(first.$timers.isTimerRunning(timerName)).to.be.true
      done()
    }, 1100)
  })
  afterEach(() => {
    first.$destroy()
    second.$destroy()
  })
})
