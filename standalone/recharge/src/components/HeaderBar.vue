<template>
  <header class="header">
    <button class="back" type="button" @click="$emit('back')">
      <img :src="backIcon" alt="返回" />
    </button>
    <h1 class="title">{{ title }}</h1>
    <span class="placeholder"></span>
  </header>
</template>

<script setup>
import backIcon from '../assets/icons/jiantou-z.svg'

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 16px;
  background: var(--ex-default-background-color);
  border-bottom: 1px solid var(--ex-border-color);
  z-index: 10;
}

.back {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s ease;

  img {
    width: 16px;
    height: 16px;
  }

  &:active {
    background: rgba(73, 54, 223, 0.1);
  }
}

.title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  color: var(--ex-default-font-color);
}

.placeholder {
  width: 32px;
  height: 32px;
}
</style>
