<template>
  <div class="page">
    <HeaderBar title="快捷充币" />
    <main class="page__body">
      <CoinList :coins="coins" />
    </main>
  </div>
</template>

<script setup>
import HeaderBar from './components/HeaderBar.vue'
import CoinList from './components/CoinList.vue'

const coins = [
  { icon: 'usdt', label: 'USDT - ERC20', code: 'USDT-ERC20' },
  { icon: 'btc', label: 'BTC', code: 'BTC' },
  { icon: 'eth', label: 'ETH', code: 'ETH' },
  { icon: 'trx', label: 'TRX', code: 'TRX' }
]
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  background-color: var(--ex-default-background-color);
}
</style>
