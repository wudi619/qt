<!-- 注册 -->
<template>
  <Header :type="1"></Header>
  <div class="loginMethod">
    <van-tabs
      shrink
      v-model:active="active"
      title-active-color="#17AC74"
      title-inactive-color="#333"
    >
      <van-tab v-for="(item, index) in tabList" :key="index" :title="item.title">
        <component :is="currentComponent"></component>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { _t18 } from '@/utils/public'
import Header from './components/signHeader.vue'
import AccountRegister from './components/sign-up/AccountRegister.vue'
import EmailRegister from './components/sign-up/EmailRegister.vue'
import MobileRegister from './components/sign-up/MobileRegister.vue'
import { useMainStore } from '@/store/index.js'
import { useRoute } from 'vue-router'
const route = useRoute()
/**
 * 登录注册方式
 * [{ id: 1, title: '账号登录', type: 1 },{ id: 2, title: '邮箱登录', type: 2 },{ id: 3, title: '手机登录', type: 3 }]
 */
// 登录注册列表
const mainStore = useMainStore()
const tabList = computed(() => {
  let list = []
  if (mainStore.getLoginMethodList.ordinaryIsOpen) {
    let obj = {}
    obj['id'] = 1
    obj['title'] = _t18('register_account', ['bitmake'])
    obj['type'] = '1'
    obj['componentName'] = AccountRegister
    list.push(obj)
  }
  if (mainStore.getLoginMethodList.emailIsOpen) {
    let obj = {}
    obj['id'] = 2
    obj['title'] = _t18('register_email')
    obj['type'] = '2'
    obj['componentName'] = EmailRegister
    list.push(obj)
  }
  if (mainStore.getLoginMethodList.phoneIsOpen) {
    let obj = {}
    obj['id'] = 3
    obj['title'] = _t18('register_mobile')
    obj['type'] = '3'
    obj['componentName'] = MobileRegister
    list.push(obj)
  }
  if (['coinsexpto'].includes(__config._APP_ENV)) {
    list = list.reverse()
  }
  return list
})
// 切换组件
const currentComponent = computed(() => {
  return tabList.value[active.value].componentName
})
// 初始组件
const active = ref(0)
</script>

<style lang="scss" scoped>
* {
  color: var(--ex-default-font-color);
  font-size: 14px;
}
.loginMethod {
  padding: 30px 15px 0;
  & > p {
    margin-top: 10px;
    text-align: right;
    color: var(--ex-font-color9);
  }
  :deep(.van-tabs__nav) {
    background: var(--ex-login-tab-background-color) !important;
  }
  :deep(.van-tab__text) {
    font-size: 16px;
  }
  :deep(.van-tabs__line) {
    display: none;
  }
  :deep(.van-tab--active) {
    font-weight: normal;
  }
  :deep(.van-tab) {
    color: var(--ex-home-list-ftcolor) !important;
  }
  :deep(.van-tab--active) {
    color: var(--ex-home-list-ftcolor3) !important;
  }
  :deep(.van-tabs__nav) {
    padding: 0;
  }
  :deep(.van-tab--shrink) {
    padding: 0 15px 10px 0;
  }
  :deep(.van-count-down) {
    font-size: 14px;
    color: var(--ex-font-color);
    padding: 0;
  }
}
</style>
