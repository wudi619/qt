<!-- 首页 -->
<script setup>

import Footer from './components/FrontPage/footer.vue'

import { useMainStore } from '@/store/index.js'
const mainStore = useMainStore()
onMounted(() => {
  mainStore.getSettingConfig()
})
</script>

<template>
   <Footer></Footer>
  
 

</template>
