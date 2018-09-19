import Vue from 'vue/dist/vue'
import { expect } from 'chai'
import jsdomGlobal from 'jsdom-global'

jsdomGlobal()

const BasicComponent = new Vue({
  template: `<div><span>something</span></div>`,
  data() {
    return {
      count: 0
    }
  }
})

const component = BasicComponent.$mount()

describe('basic component works', () => {
  it('component has text', () => {
    expect(component.count).to.eq(0)
  })
})
