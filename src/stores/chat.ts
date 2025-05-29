/**
 * @Author: zhaoxin
 * @Date: 2025/5/22 15:44
 * @Description: desc
 */

import { defineStore } from 'pinia'

type STATE = {
  activeChat: string
}

export const useChatStore = defineStore('chat', {
  state: () =>
    ({
      activeChat: '1',
    }) as STATE,
  getters: {},
  actions: {},
})
