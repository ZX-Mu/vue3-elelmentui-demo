<template>
  <div class="count-page">
    <h1>{{ text }}</h1>
    <div class="count">Count: {{ counterStore.count }}</div>
    <div class="count">DoubleCount: {{ counterStore.doubleCount }}</div>
    <el-button class="btn" type="primary" :icon="Plus" @click="addCount">Add Count</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { Plus } from '@element-plus/icons-vue'
const counterStore = useCounterStore()
const addCount = () => {
  counterStore.increment()
}
const text = ref('This is an about page')
</script>

<style lang="scss" scoped>
.count-page {
  @apply flex flex-col items-center justify-center min-h-screen;
}
.count {
  @apply text-[24px];

  background-color: $bg-color;
}
.btn {
  width: 100px;
  height: 40px;
  margin-top: 16px;
  line-height: 40px;
  color: #ffffff;
  text-align: center;
  background: #00bd7e;
}
</style>
