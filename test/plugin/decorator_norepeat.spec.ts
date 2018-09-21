import Component from 'vue-class-component'
import Vue from 'vue'
import VueTimers from '../..'

Vue.use(VueTimers)

@Component
class FirstComponent extends Vue {
  count = 0
}
