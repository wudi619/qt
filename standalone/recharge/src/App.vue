<template>
  <div class="page">
    <HeaderBar title="快捷充币" @back="handleBack" />
    <CoinList :coins="coins" />
    <div class="custom" @click="handleService">
      <div class="left">
        <span class="service-img" aria-hidden="true"></span>
        <span class="text">人工匹配商家</span>
      </div>
      <img class="arrow" :src="arrowIcon" alt="箭头" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderBar from './components/HeaderBar.vue'
import CoinList from './components/CoinList.vue'

import arrowIcon from './assets/icons/jiantou.svg'

const coins = ref([
  { icon: 'usdt', name: 'USDT - ERC20', address: '0x1234...ABCD' },
  { icon: 'btc', name: 'BTC', address: 'bc1q....xyz' },
  { icon: 'eth', name: 'ETH', address: '0x5678...EFGH' },
  { icon: 'trx', name: 'TRX', address: 'TX1234....5678' }
])

const handleBack = () => {
  window.history.length > 1 ? window.history.back() : console.log('返回')
}

const handleService = () => {
  alert('联系客服，人工匹配商家')
}
</script>

<style scoped lang="scss">
.page {
  padding-bottom: 32px;
}

.custom {
  margin: 30px 15px 0;
  padding: 12px 16px;
  border-radius: 12px;
  background: #f9f9ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px rgba(73, 54, 223, 0.1);

  .left {
    display: flex;
    align-items: center;
    gap: 14px;

    .service-img {
      display: inline-block;
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }

    .text {
      font-size: 14px;
      color: var(--ex-primary-color);
    }
  }

  .arrow {
    width: 12px;
    height: 12px;
  }
}
</style>
