<!--
 - @Author: zhaoxin
 - @Date: 2025/5/22 15:41
 - @Description: desc
 -->
<template>
  <!--prose样式为了解决tailwindcss下h1样式不生效问题，在引入@tailwindcss/typography插件的方案时-->
  <!--<div class="prose">-->
  <div>
    <BubbleList :list="chatContentLists">
      <!-- 自定义头部 -->
      <template #header="{ item }">
        <div class="text-sm color-gray-500 mb-0.5">
          {{ item.role === 'ai' ? 'AI' : '你自己' }}
        </div>
      </template>
      <!-- 自定义底部 -->
      <template #footer>
        <div class="flex items-center bubble-btn">
          <el-button type="info" :icon="Refresh" size="small" circle />
          <el-button type="warning" :icon="Star" size="small" circle />
          <el-button color="#626aef" :icon="DocumentCopy" size="small" circle />
        </div>
      </template>
    </BubbleList>
  </div>
</template>

<script lang="ts" setup>
import { DocumentCopy, Refresh, Star } from '@element-plus/icons-vue'
import { BubbleList } from 'vue-element-plus-x'
import { ref } from 'vue'
import type { BubbleListItemProps } from 'vue-element-plus-x/types/components/BubbleList/types'

// Prism 核心基础样式（必须导入，包含语法高亮的基础样式和结构）
import 'vue-element-plus-x/styles/prism.min.css'
// markdown主题，Okaidia 主题（深色高对比度主题，注重代码结构区分）
import 'vue-element-plus-x/styles/prism-okaidia.min.css'

const markdownText =
  ref(`#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` \n \`\`\`mermaid
 pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
 \n
\`\`\`

\`\`\`mermaid
 xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]

 \n
\`\`\`
`)

//列表
type ChatContentListItem = BubbleListItemProps & { id: string; role: 'user' | 'ai' }
const chatContentLists = ref<ChatContentListItem[]>([
  {
    id: '1', // 唯一标识
    role: 'ai', // user | ai 自行更据模型定义
    placement: 'start', // start | end 气泡位置
    content: `# 标题 \n 正文! \n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` \n`, // 消息内容 流式接受的时候，只需要改这个值即可
    loading: false, // 当前气泡的加载状态
    shape: 'corner', // 气泡的形状
    variant: 'filled', // 气泡的样式
    isMarkdown: true, // 是否渲染为 markdown
    // typing: { step: 1, interval: 100, suffix: '✌️' }, // 是否开启打字器效果 该属性不会和流式接受冲突
    typing: false, // 是否开启打字器效果 该属性不会和流式接受冲突
    isFog: false, // 是否开启打字雾化效果，该效果 v1.1.6 新增，且在 typing 为 true 时生效，该效果会覆盖 typing 的 suffix 属性
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    avatarSize: '36px', // 头像占位大小
    avatarGap: '12px', // 头像与气泡之间的距离
  },
])

//新增用户讲话内容
const addUserContent = (data: { id: string; content: string }) => {
  chatContentLists.value.push({
    id: data.id, // 唯一标识
    role: 'user',
    placement: 'end', //start | end 气泡位置
    content: data.content, // 消息内容 流式接受的时候，只需要改这个值即可
    loading: false, // 当前气泡的加载状态
    shape: 'corner', // 气泡的形状
    variant: 'outlined', // 气泡的样式
    isMarkdown: false, // 是否渲染为 markdown
    typing: false, // 是否开启打字器效果 该属性不会和流式接受冲突
    isFog: false, // 是否开启打字雾化效果，该效果 v1.1.6 新增，且在 typing 为 true 时生效，该效果会覆盖 typing 的 suffix 属性
    avatar: 'https://avatars.githubusercontent.com/u/36186573?v=4',
    avatarSize: '36px', // 头像占位大小
    avatarGap: '12px', // 头像与气泡之间的距离
  })
}
//新增机器人讲话
const addAIContent = () => {
  //加载中
  const len = chatContentLists.value.push({
    id: `${new Date().getTime().toString()}`, // 唯一标识
    role: 'ai',
    placement: 'start', //start | end 气泡位置
    content: '', // 消息内容 流式接受的时候，只需要改这个值即可
    loading: true, // 当前气泡的加载状态
    shape: 'corner', // 气泡的形状
    variant: 'filled', // 气泡的样式
    isMarkdown: true, // 是否渲染为 markdown
    typing: { step: 1, interval: 100 }, // 是否开启打字器效果 该属性不会和流式接受冲突
    isFog: true, // 是否开启打字雾化效果，该效果 v1.1.6 新增，且在 typing 为 true 时生效，该效果会覆盖 typing 的 suffix 属性
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    avatarSize: '36px', // 头像占位大小
    avatarGap: '12px', // 头像与气泡之间的距离
  })
  const index = len - 1
  setTimeout(() => {
    chatContentLists.value[index].loading = false
    chatContentLists.value[index].content = markdownText.value
  }, 5000)
}
defineExpose({
  addUserContent,
  addAIContent,
})
</script>

<style scoped lang="scss">
.bubble-btn {
  .el-button + .el-button {
    margin-left: 6px;
  }
}
::v-deep(.markdown-body) {
  background-color: transparent;
}
</style>
