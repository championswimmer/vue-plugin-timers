import VC, { Vue } from 'vue/types/vue'
import VueTimersMixin from './mixin'

export { VueTimersMixin }
export { Timer } from './decorator'

export default function(Vue: VC.VueConstructor) {
  Vue.mixin(VueTimersMixin)
}

type DefaultTimers<V, Methods> = {
  [key in keyof Methods]: {
    repeat?: boolean
    interval?: number
    args?: (this: V) => []
  }
}
declare module 'vue/types/options' {
  export interface ComponentOptions<
    V extends Vue,
    Data = DefaultData<V>,
    Methods = DefaultMethods<V>,
    Computed = DefaultComputed,
    PropsDef = PropsDefinition<DefaultProps>,
    Props = DefaultProps
  > {
    timers?: DefaultTimers<V, Methods>
  }
}
declare module 'vue/types/vue' {
  export interface Vue {
    readonly $timers: { start: Function; stop: Function }
  }
}
