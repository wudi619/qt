<template>
  <section class="list">
    <h2 class="title">币种列表</h2>
    <div
      v-for="coin in coins"
      :key="coin.name"
      class="item"
      role="button"
      tabindex="0"
      @click="openDetails(coin)"
    >
      <div class="left">
        <img class="icon" :src="iconMap[coin.icon]" :alt="coin.name" />
        <span class="name">{{ coin.name }}</span>
      </div>
      <img class="arrow" :src="arrowIcon" alt="查看" />
    </div>
  </section>
</template>

<script setup>
import arrowIcon from '../assets/icons/jiantou.svg'
import btcIcon from '../assets/icons/btc.svg'
import ethIcon from '../assets/icons/eth.svg'
import trxIcon from '../assets/icons/trx.svg'
import usdtIcon from '../assets/icons/usdt.svg'

const props = defineProps({
  coins: {
    type: Array,
    default: () => []
  }
})

const iconMap = {
  btc: btcIcon,
  eth: ethIcon,
  trx: trxIcon,
  usdt: usdtIcon
}

const openDetails = (coin) => {
  alert(`${coin.name} 地址: ${coin.address}`)
}
</script>

<style scoped lang="scss">
.list {
  padding: 28px 15px 0;
}

.title {
  font-size: 16px;
  margin-bottom: 20px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateX(2px);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    border-radius: 12px;
  }
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  width: 28px;
  height: 28px;
}

.name {
  font-size: 15px;
}

.arrow {
  width: 12px;
  height: 12px;
}
</style>
