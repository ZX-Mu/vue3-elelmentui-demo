<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <h1 class="text-2xl font-bold mb-5">Home</h1>
    <base-test />
    <home-children-test />
  </div>
</template>
<script setup lang="ts">
import BaseTest from '@/components/BaseTest.vue'
import HomeChildrenTest from './components/HomeChildrenTest.vue'
</script>
<style scoped lang="scss"></style>
