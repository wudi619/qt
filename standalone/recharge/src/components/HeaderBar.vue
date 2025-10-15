<template>
  <div class="placeholder"></div>
  <header class="header" :class="{ 'header--border': borderBottom }">
    <div class="header__left">
      <button type="button" class="header__back" @click="handleBack" aria-label="返回">
        <img :src="backIcon" alt="" />
      </button>
      <div class="header__title">{{ title }}</div>
    </div>
    <div class="header__right"></div>
  </header>
</template>

<script setup>
import backIcon from '../assets/icons/jiantou-z.svg'

const { title, borderBottom } = defineProps({
  title: {
    type: String,
    default: ''
  },
  borderBottom: {
    type: Boolean,
    default: true
  }
})

const handleBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  }
}
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
  z-index: 10;
}

.header--border {
  border-bottom: 1px solid var(--ex-border-color);
}

.header__left {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: var(--ex-default-font-color);
}

.header__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 15px;
  padding: 0;
  border: none;
  background: none;
}

.header__back img {
  width: 16px;
  height: 12px;
}

.header__title {
  font-size: 16px;
}

.header__right {
  flex: 1;
}
</style>
