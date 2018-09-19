import Vue from 'vue/dist/vue'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import jsdomGlobal from 'jsdom-global'

jsdomGlobal()

const SimpleComponent = {
  template: `<div><span>something</span></div>`,
  data() {
    return {
      count: 0
    }
  }
}
const wrapper = mount(SimpleComponent, { localVue: createLocalVue() })

describe('basic component works', () => {
  it('component has text', () => {
    console.log(wrapper.contains('div'))
  })
})
