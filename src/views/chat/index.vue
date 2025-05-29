<!--
 - @Author: zhaoxin
 - @Date: 2025/5/21 11:36
 - @Description: 体验element-plus-x，快速构建对话页面
 -->
<template>
  <div class="w-full h-full">
    <el-container class="w-full h-full">
      <!--侧边列表-->
      <el-aside>
        <chat-list></chat-list>
      </el-aside>
      <!--右侧对话-->
      <el-container>
        <!--标题-->
        <el-header>
          <div class="w-full h-full border-b flex justify-center items-center">{{ activeChatTitle }}</div>
        </el-header>
        <!--对话列表-->
        <el-main>
          <chat-content-list ref="chatContentListRef"></chat-content-list>
        </el-main>
        <!--输入框-->
        <el-footer style="height: fit-content; padding: 20px">
          <chat-sender @send="handleSend"></chat-sender>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import ChatList from '@/views/chat/components/ChatList.vue'
import ChatContentList from '@/views/chat/components/ChatContentList.vue'
import ChatSender from '@/views/chat/components/ChatSender.vue'

//标题
// const activeChatTitle = computed(() => {
//   return chatMenuLists.value.find(i => i.id === activeChatMenuItem.value)?.label
// })
const activeChatTitle = ref('标题啊啊啊')

const chatContentListRef = ref()
//发送内容
const handleSend = (data: { id: string; content: string }) => {
  chatContentListRef.value.addUserContent(data)
  //回复，实际场景中需要对上流式接口的响应
  chatContentListRef.value.addAIContent()
}
</script>

<style scoped lang="scss"></style>
