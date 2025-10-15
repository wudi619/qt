<template>
  <div class="placeholder"></div>
  <header class="header" :class="{ border_bottom: borderBottom }">
    <div class="left">
      <img class="leftImg" :src="backIcon" alt="返回" @click="$emit('back')" />
      <div>{{ title }}</div>
    </div>
    <div class="right"></div>
  </header>
</template>

<script setup>
import backIcon from '../assets/icons/jiantou-z.svg'

defineProps({
  title: {
    type: String,
    default: ''
  },
  borderBottom: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped lang="scss">
.placeholder {
  height: 61px;
}

.header {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: var(--ex-max-width);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 15px;
  background-color: var(--ex-default-background-color);
  z-index: 99;
}

.header.border_bottom {
  border-bottom: 1px solid var(--ex-border-color);
}

.left {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: normal;
  color: var(--ex-default-font-color);
}

.left div {
  font-size: 16px;
}

.leftImg {
  width: 16px;
  height: 12px;
  margin-right: 15px;
  cursor: pointer;
}

.right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
