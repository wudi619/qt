<template>
  <section class="content">
    <p>币种列表</p>
    <div class="list">
      <div
        v-for="coin in coins"
        :key="coin.code"
        class="listCoin"
        @click="openCoin(coin)"
      >
        <div class="left">
          <img class="coin" :src="iconMap[coin.icon]" :alt="coin.label" />
          <span>{{ coin.label }}</span>
        </div>
        <div class="right">
          <img class="jiantou" :src="arrowIcon" alt="" />
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

  p {
    font-size: 16px;
    margin-bottom: 20px;
    text-align: left;
  }

  .list {
    .listCoin {
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left,
      .right {
        display: flex;
        align-items: center;

        .coin {
          width: 20px;
          height: 20px;
          margin-right: 15px;
        }

        .jiantou {
          width: 10px;
          height: 10px;
        }
      }
    }
  }
}
</style>
