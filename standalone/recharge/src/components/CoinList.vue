<template>
  <section class="content">
    <p class="content__title">币种列表</p>
    <div class="list">
      <div
        v-for="coin in coins"
        :key="coin.code"
        class="list__item"
        role="button"
        tabindex="0"
        @click="openCoin(coin)"
      >
        <div class="list__item-left">
          <img class="list__icon" :src="iconMap[coin.icon]" :alt="coin.label" />
          <span class="list__label">{{ coin.label }}</span>
        </div>
        <div class="list__item-right">
          <img class="list__arrow" :src="arrowIcon" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import arrowIcon from '../assets/icons/jiantou.svg'
import btcIcon from '../assets/icons/btc.svg'
import ethIcon from '../assets/icons/eth.svg'
import trxIcon from '../assets/icons/trx.svg'
import usdtIcon from '../assets/icons/usdt.svg'

const { coins } = defineProps({
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

const openCoin = (coin) => {
  const url = `recharge-apply.html?coin=${coin.code}`
  window.location.href = url
}
</script>

<style scoped lang="scss">
* {
  font-size: 14px;
  color: var(--ex-default-font-color);
}

.content {
  padding: 30px 15px 0;
}

.content__title {
  font-size: 16px;
  margin-bottom: 20px;
  text-align: left;
}

.list__item {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list__item-left,
.list__item-right {
  display: flex;
  align-items: center;
}

.list__icon {
  width: 20px;
  height: 20px;
  margin-right: 15px;
}

.list__arrow {
  width: 10px;
  height: 10px;
}
</style>
