<!--
 - @Author: zhaoxin
 - @Date: 2025/5/22 11:47
 - @Description: 侧边栏
 -->
<template>
  <div class="h-full w-full">
    <Conversations
      v-model:active="activeChat"
      :items="chatMenuLists"
      :show-tooltip="true"
      :groupable="true"
      :show-built-in-menu="true"
      row-key="id"
      :items-style="{
        padding: '10px',
        transition: 'all 0.3s',
        border: '2px dashed transparent',
        margin: '0 12px 12px 4px',
        color: '#303133',
      }"
      :items-hover-style="{
        background: '#f2f2ff',
        border: '2px dashed #8e8eff',
      }"
      :items-active-style="{
        background: '#626aef',
        color: '#FFF',
        border: '2px dashed transparent',
      }"
      :items-menu-opened-style="{
        border: '2px dashed transparent',
      }"
      @change="handleChange"
      @menu-command="handleMenuCommand"
    >
      <!--label在原结构中有一层span包裹，在items-active-style中也无法改变文字颜色，可以在这修改下结构-->
      <template #label="{ item }">
        <div class="custom-label">
          {{ item.label }}
        </div>
      </template>
      <template #groupTitle="{ group }">
        <div class="custom-group-title">
          <!-- 为不同组添加不同的前缀 -->
          <span v-if="group.title === '随便组'">🫟 </span>
          <span v-else-if="group.title === '你好组'">😊 </span>
          <span v-else>🈚️ </span>
          {{ group.title }}
        </div>
      </template>
      <template #more-filled="{ isHovered, isActive, isMenuOpened }">
        <span v-if="isHovered">👈</span>
        <span v-if="isActive">📌</span>
        <span v-if="isMenuOpened">
          <el-icon><CaretBottom /></el-icon>
        </span>
      </template>
    </Conversations>
  </div>
</template>

<script lang="ts" setup>
import { Conversations } from 'vue-element-plus-x'
import { CaretBottom } from '@element-plus/icons-vue'
import { ref } from 'vue'
import type { ConversationItem, ConversationMenuCommand } from 'vue-element-plus-x/types/components/Conversations/types'
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'

const chatStore = useChatStore()
const { activeChat } = storeToRefs(chatStore)

//菜单列表
type ChatMenuListItem = ConversationItem & { id: string; label: string }
const chatMenuLists = ref<ChatMenuListItem[]>([
  {
    id: '1',
    label: '会话1是个长标题哦，测试一下展示效果，哈哈哈',
    group: '随便组',
  },
  {
    id: '2',
    label: '会话2',
    group: '随便组',
  },
  {
    id: '3',
    label: '会话3',
    group: '你好组',
  },
  {
    id: '4',
    label: '会话4',
    group: '你好组',
  },
  {
    id: '5',
    label: '会话5',
  },
  {
    id: '6',
    label: '会话6',
  },
])
const handleChange = (item: ConversationItem<{ id: string; label: string }>) => {
  console.log('[chat] select item: ', item.label)
}
//列表菜单点击处理
const handleMenuCommand = (command: ConversationMenuCommand, item: ConversationItem) => {
  console.log("[chat] active item(%s)'s menu click:", item.label, command)
  switch (command) {
    case 'rename':
      console.log(`重命名: ${item.label}`)
      break
    case 'delete':
      console.log(`删除: ${item.label}`)
      break
  }
}
</script>

<style scoped lang="scss">
.custom-group-title {
  display: flex;
  align-items: center;
  font-weight: 500;

  /* color: #626aef; */
}
.custom-label {
  display: flex;
  align-items: center;
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
