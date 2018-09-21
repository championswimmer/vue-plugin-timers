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

  @Timer({ interval: 200, repeat: true })
  incr() {
    this.count++
  }
}

@Component({ render: (h) => h('div') })
class SecondComponent extends Vue {
  count = 0

  @Timer({ interval: 400, repeat: true })
  incr() {
    this.count++
  }
}

describe('[Vue.use]: @Timer {repeat: true}', () => {
  let first: FirstComponent
  let second: SecondComponent
  before(() => {
    first = new FirstComponent()
    first.$mount()
    second = new SecondComponent()
    second.$mount()
  })
  it('both components timers work', (done) => {
    setTimeout(() => {
      expect(first.count).to.eq(4)
      expect(second.count).to.eq(2)
      done()
    }, 900)
  })
  after(() => {
    first.$destroy()
    second.$destroy()
  })
})
