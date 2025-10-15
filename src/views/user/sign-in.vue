<!-- 登录 -->
<template>
  <Header :type="0"></Header>
  <div class="loginMethod">
    <van-tabs
      v-model:active="active"
      shrink
      color="transparent"
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
import AccountLogin from './components/sign-in/AccountLogin.vue'
import EmailLogin from './components/sign-in/EmailLogin.vue'
import MobileLogin from './components/sign-in/MobileLogin.vue'
import { useMainStore } from '@/store/index.js'
/**
 * 登录注册方式
 * [{ id: 1, title: '账号登录', type: 1 },{ id: 2, title: '邮箱登录', type: 2 },{ id: 3, title: '手机登录', type: 3 }]
 */
// 登录列表
const mainStore = useMainStore()
const tabList = computed(() => {
  let list = []
  if (mainStore.getLoginMethodList.ordinaryIsOpen || ['aams'].includes(__config._APP_ENV)) {
    let obj = {}
    obj['id'] = 1
    obj['title'] = _t18('login_account', ['bitmake', 'aams'])
    obj['type'] = '1'
    obj['componentName'] = AccountLogin
    list.push(obj)
  }
  if (mainStore.getLoginMethodList.emailIsOpen && !['aams'].includes(__config._APP_ENV)) {
    let obj = {}
    obj['id'] = 2
    obj['title'] = _t18('login_email')
    obj['type'] = '2'
    obj['componentName'] = EmailLogin
    list.push(obj)
  }
  if (mainStore.getLoginMethodList.phoneIsOpen) {
    let obj = {}
    obj['id'] = 3
    obj['title'] = _t18('login_mobile')
    obj['type'] = '3'
    obj['componentName'] = MobileLogin
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

  :deep(.van-tab__text) {
    font-size: 16px;
  }
  :deep(.van-tabs__nav) {
    background: var(--ex-login-tab-background-color) !important;
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
