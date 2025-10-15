<template>
  <div>
    <HeaderBar title="快捷充币" @back="handleBack" />
    <CoinList :coins="coins" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderBar from './components/HeaderBar.vue'
import CoinList from './components/CoinList.vue'

const coins = ref([
  { icon: 'usdt', name: 'USDT - ERC20', address: '0x1234...ABCD' },
  { icon: 'btc', name: 'BTC', address: 'bc1q....xyz' },
  { icon: 'eth', name: 'ETH', address: '0x5678...EFGH' },
  { icon: 'trx', name: 'TRX', address: 'TX1234....5678' }
])

const handleBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  }
}
</script>
