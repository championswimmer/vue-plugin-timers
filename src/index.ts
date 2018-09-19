import { Vue } from 'vue/types/vue'
import VueTimersMixin from './mixin'

export { VueTimersMixin }

type DefaultTimers<Methods> = {
  [key in keyof Methods]: {
    repeat?: boolean
    interval?: number
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
    timers: DefaultTimers<Methods>
  }
}
