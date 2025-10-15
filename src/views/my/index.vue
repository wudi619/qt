<!-- 首页 -->
<script setup>
import Header from './components/FrontPage/header.vue'
import { useMainStore } from '@/store/index.js'
const mainStore = useMainStore()
onMounted(() => {
  mainStore.getSettingConfig()
})
</script>

<template>
  <!-- <HeaderDiff v-if="DIFF_HOME_BANNER.includes(_getConfig('_APP_ENV'))"></HeaderDiff> -->
  <Header ></Header>
 

</template>
