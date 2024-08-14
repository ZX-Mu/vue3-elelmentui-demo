// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }
//
//   return { count, doubleCount, increment }
// })

type STATE = {
  count: number
  [propName: string]: any
}

// 选项式的写法还是更舒服一点，组合式的store最后都要return，容易漏掉。。
export const useCounterStore = defineStore('counter', {
  state: () =>
    ({
      count: 0,
    }) as STATE,
  getters: {
    doubleCount: (state: STATE) => {
      return state.count * 2
    },
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
