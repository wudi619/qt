<!-- 首页 -->
<template>
  <div>
    <van-popup v-model:show="show" position="right" class="sidebar" @close="closeSideBar">
      <SideBar @closeSideBar="closeSideBar"></SideBar>
    </van-popup>
    <div class="top">
      <div>
        <Logo></Logo>
      </div>
      <div>
        <svg-load name="user" class="rightImg" @click="openSideBar"></svg-load>
      </div>
    </div>
    <div class="carousel">
      <van-swipe :autoplay="3000" lazy-render :loop="true" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in carouselList" :key="index">
          <image-load
            :filePath="item.imgUrl"
            alt=""
            class="carouselItem"
            @click="linkto(item.detailUrl)"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
  <div class="currentList">
    <div
      class="item centerItem"
      v-for="(item, index) in dataList.filter((it, idx) => {
        return idx < 4
      })"
      :key="index"
      @click="linkTo(item)"
    >
      <div class="itemTop ff-num">{{ item.showSymbol }}</div>
      <div
        :class="[
          _isRFD(
            tradeStore.allCoinPriceInfo[item.coin]?.openPrice,
            tradeStore.allCoinPriceInfo[item.coin]?.close
          ),
          'rfd-sign itemMain ff-num'
        ]"
      >
        {{ tradeStore.allCoinPriceInfo[item.coin]?.priceChangePercent }}%
      </div>
      <div
        :class="[
          _isRFD(
            tradeStore.allCoinPriceInfo[item.coin]?.open,
            tradeStore.allCoinPriceInfo[item.coin]?.close
          ),
          'itemFooter fw-num'
        ]"
      >
        {{ tradeStore.allCoinPriceInfo[item.coin]?.close }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTradeStore } from '@/store/trade/index'
import { useMainStore } from '@/store/index.js'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { publiceNotice } from '@/api/common/index'
import { computed } from 'vue'
import SideBar from '@/views/home/sidebar/index.vue'
const show = ref(false)
const openSideBar = () => {
  show.value = true
}
const closeSideBar = () => {
  show.value = false
}
const tradeStore = useTradeStore()
const mainStroe = useMainStore()
const $router = useRouter()

const dataList = computed(() => {
  // let tempFilterKey = Object.keys(tradeStore.allCoinPriceInfo)
  //   .filter((key) => tradeStore.allCoinPriceInfo[key]?.priceChangePercent > 0)
  //   .slice(0, 3)
  let tempData = []
  let tempFilterKey = mainStroe.getHomeCoinList.map((item) => {
    if (item.isOpen == 'true') {
      return item.coin
    }
  })
  // let tempData = tradeStore.secondContractCoinList.filter((elem) =>
  //   tempFilterKey.includes(elem.coin)
  // )
  tempFilterKey.forEach((elem) => {
    tradeStore.secondContractCoinList.forEach((elem2) => {
      if (elem2.coin == elem) {
        tempData.push(elem2)
      }
    })
  })
  return tempData
})

const linkTo = (item) => {
  mainStroe.setTradeStatus(Number(0))
  $router.push(`/trade?symbol=${item.coin}`)
}
const carouselList = ref([])
const linkto = (detailUrl) => {
  if (detailUrl.includes('http')) {
    location.href = detailUrl
  } else {
    $router.push(`${detailUrl}`)
  }
}

onMounted(async () => {
  try {
    const res = await publiceNotice('ACTIVITY_NOTICE', 'HOME_ACTIVITY ')
    if (res.code === 200) {
      carouselList.value = res.data.filter((item) => {
        return item.status != '1'
      })
    }
  } catch (error) {}
})
</script>
<style lang="scss" scoped>
:deep(.sidebar) {
  max-width: var(--ex-max-width);
  width: 100vw;
  height: 100vh;
  right: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform right left var(--van-duration-base);
}
.top {
  height: 52px;
  background: var(--ex-default-background-color);
  border-radius: 5px;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // transform: translateX(-50%);
  // width: calc(100% - 30px); /* 减去两侧的间距 */
  .leftImg {
    width: 25px;
    height: 25px;
  }
  .centerImg {
    width: 56px;
    height: 14px;
    margin-left: 5px;
  }
  .rightImg {
    width: 24px;
    height: 24px;
  }
}
.carousel {
  // height: 200px;
  padding: 0 15px;
  .carouselItem {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
}
.currentList {
  margin: 15px 15px 20px;
  // position: absolute;
  // left: 50%;
  // transform: translateX(-50%);
  // width: calc(100% - 30px); /* 减去两侧的间距 */
  box-sizing: border-box;
  // top: 172px;
  background-color: var(--ex-home-box-background-color);
  box-shadow: 0px 1px 10px 1px rgba(5, 5, 5, 0.1);
  border-radius: 10px;
  display: flex;
  padding: 20px 0;
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    .itemTop {
      font-size: 14px;
      color: var(--ex-default-font-color);
      font-weight: 400;
    }
    .itemMain {
      margin-top: 5px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
      .itemMainImg {
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }
    }
    .itemFooter {
      display: flex;
      font-size: 16px;
      margin-top: 10px;
    }
  }

  .centerItem {
    justify-content: center;
    align-items: center;
  }
}
</style>
