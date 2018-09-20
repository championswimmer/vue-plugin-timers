# vue-plugin-timers

A Vue.JS plugin/mixin that helps set timeouts and heartbeats in your Vue components


## The Problem - Creating Heartbeats

Say we create a vue.js component

```js
export default {
  data: {
    minutes: new Date().getMinutes()
  }
}
```
What if we want minutes to update along with the user's clock
when this component is open.

```js
export default {
  get minutes() {
    return new Date().getMinutes()
  }
}
```

But, **unfortunately** this does **not work**.
Reason ?
`new Date()` or `Date.now()` type of objects are not reactive
We get their value once, but it doesn't update every minutes/second o so

## Solution - Use timers

### Basic usage (as mixin: with single component)

```js
import { VueTimersMixin } from 'vue-plugin-timers'
import Vue from 'vue'

const MyComponent = Vue.extend({
  data: {
    minutes: new Date().getMinutes()
  },
  methods: {
    updateMinutes() {this.minutes = new Date().getMinutes()}
  },
  timers: {
    /* key = name of method */
    updateMinutes: {
      /* interval of delay (default: 1000) */
      interval: 30000,
      /* repeat: true => setInterval, (default: false) => setTimeout once */
      repeat: true
    }
  }
})