import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import jsdomGlobal from 'jsdom-global'
import { ComponentOptions } from 'vue/types/options'
import { VueTimersMixin } from '..'

jsdomGlobal()

const TimerComponent = {
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
} as ComponentOptions<any>

Vue.mixin(VueTimersMixin)

const wrapper = mount(TimerComponent, { localVue: Vue })

describe('basic component timers', () => {
  it('component timer ticks', (done) => {
    setTimeout(() => {
      expect((wrapper.vm as any).count).to.eq(5)
      wrapper.vm.$timers.stop()
      done()
    }, 1100)
  })
})
