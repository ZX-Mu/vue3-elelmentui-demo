<!--
 - @Author: zhaoxin
 - @Date: 2025/5/22 16:09
 - @Description: desc
 -->
<template>
  <div>
    <Sender
      v-model="inputContent"
      placeholder="请输入你想问的问题 ~ （enter键发送、shift + enter键换行）"
      :loading="sending"
      :read-only="sending"
      :auto-size="{ minRows: 1, maxRows: 4 }"
      @submit="handleSend"
      @cancel="handleSendCancel"
    >
      <!--自定义的话，禁用状态和loading状态需要自行控制，懒得写了😂-->
      <!--
      <template #action-list>
        <div class="flex items-center">
          <el-button v-if="sending" type="primary" plain circle @click="handleSendCancel">
            <el-icon class="send-loading">
              <Loading />
            </el-icon>
          </el-button>
          <el-button v-else circle color="#626aef" @click="handleSend">
            <el-icon>
              <Promotion />
            </el-icon>
          </el-button>
        </div>
      </template>
      -->
    </Sender>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Sender } from 'vue-element-plus-x'
// import { Promotion, Loading } from '@element-plus/icons-vue'

const emit = defineEmits(['send'])

const inputContent = ref()
const sending = ref(false)
const handleSend = () => {
  console.log('[chat] send content:', inputContent.value)
  sending.value = true
  //为了看下loading效果
  setTimeout(() => {
    emit('send', {
      id: `${new Date().getTime().toString()}`, // 唯一标识
      content: inputContent.value, // 消息内容
    })
    inputContent.value = ''
    sending.value = false
  }, 1000)
}
const handleSendCancel = () => {
  console.warn('[chat] send content cancel:', inputContent.value)
}
</script>

<style scoped lang="scss">
.send-loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
