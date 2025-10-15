<!-- 首页 -->
<template>
  <div class="box">

    <UserLogin></UserLogin>
    <h3>{{ _t18('kuai-jie-ru-kou-0') }}</h3>
    <div class="box1">
      <div v-for="item in ShortcutFeatures" @click="onFeaturesSkip(item.featurerouter)">
        <!-- <img :src="item.featuresUrl" alt=""> -->
        <image-load :filePath="item.featuresUrl" alt="" />
 
        <span>{{ item.name }}</span>
      </div>
      <!-- <img src="@/components/img/银行卡.png" alt=""> -->
    </div>
    <!-- <Navigation></Navigation> -->
    <h3>{{_t18('tong-yong') }}</h3>
    <Navigation></Navigation>
    <div class="logged" @click="exit">
      <svg-load name="tuichu" class="loggedImg"></svg-load>
      <!-- 退出登录 -->
      <div>{{ _t18('layout', ['aams']) }}</div>
    </div>

    <Dialog v-model:value="showDialog" :title="``" :content="_t18('layout_require')" confirm-button-color="#17ac74"
      @cancelBtn="cancelBtn" @confirmBtn="confirmBtn" :confirmButtonText="_t18('btnConfirm', ['bitmake'])"
      :cancelButtonText="_t18('cancel')" z-index="200"></Dialog>
  </div>
</template>
<script setup>

import { _back, _t18, _toView, _toReplace } from '@/utils/public'
import UserLogin from '@/views/my/components/Sidebar/userLogin.vue'
import Navigation from '@/views/my/components/Sidebar/navigation.vue'
import Dialog from '@/components/Dialog/index.vue'
// import Navigation from '@/src\views\mine\components\Sidebar\navigation.vue.vue'
import { useTradeStore } from '@/store/trade/index'
import { useMainStore } from '@/store/index.js'
import { signOut } from '@/api/user'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { publiceNotice } from '@/api/common/index'
import { computed } from 'vue'
import SideBar from '@/views/home/sidebar/index.vue'
import { name } from 'pubsub-js'
const show = ref(false)
const openSideBar = () => {
  show.value = true
}

const tradeStore = useTradeStore()
const mainStroe = useMainStore()
const $router = useRouter()

const ShortcutFeatures = ref([
  { name: _t18('xiu-gai-mi-ma'), featuresUrl: './img/xgmm.png', featurerouter: '/change-password' },
  { name: _t18('sidebar_primary'), featuresUrl: './img/identity.png', featurerouter: '/certification-primary' },
  { name: _t18('paxpay_sidebar_advanced'), featuresUrl: './img/identity2.png', featurerouter: '/certification-advanced' },
  { name: _t18('sidebar_daikuan'), featuresUrl: './img/mailbox.png', featurerouter: '/loan' },

])
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

const onFeaturesSkip = (featurerouter) => {
  console.log(featurerouter);
  $router.push(featurerouter)
}

onMounted(async () => {
  try {
    const res = await publiceNotice('ACTIVITY_NOTICE', 'HOME_ACTIVITY ')
    if (res.code === 200) {
      // carouselList.value = res.data.filter((item) => {
      //   return item.status != '1'
      // })
    }
  } catch (error) { }
})


const showDialog = ref(false)
// 退出登录
const exit = () => {
  showDialog.value = true
}
const confirmBtn = () => {
  showDialog.value = false
  signOut()
    .then((res) => {
      if (res.code == '200') {
        _toast('layout_success')
        // 清除token
        userStore.signOut()
        _toReplace('/')
        closeSideBar()
        isSign.value = false
        setTimeout(() => location.reload(), 10)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const cancelBtn = () => {
  showDialog.value = false
}
const emit = defineEmits(['closeSideBar'])
const closeSideBar = () => {
  emit('closeSideBar')
}
</script>
<style lang="scss" scoped>
:deep(.sidebar) {
  margin-top: -1px;
  max-width: var(--ex-max-width);
  width: 100%;
  left: auto;
  height: 100%;
}

.box {
  margin-bottom: 100px;

  .box1 {
    display: flex;
    justify-content: space-around;

    div {
      width: 50px;
      height: 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      img {
        width: 35px;
        // height: 50px;
        height: 40px;
      }
    }
  }
}

.carousel {
  height: 200px;
  background-color: #4936DF;

  .carouselItem {
    height: 200px;
    width: 100%;
    object-fit: cover;
  }

  .top {
    height: 52px;
    background: var(--ex-home-box-background-color3);
    border-radius: 5px;
    padding: 15px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 30px);

    /* 减去两侧的间距 */
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
}

.currentList {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 30px);
  /* 减去两侧的间距 */
  box-sizing: border-box;
  top: 172px;
  background-color: var(--ex-home-box-background-color);
  box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.1);
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
      margin-top: 5px;
    }
  }

  .centerItem {
    justify-content: center;
    align-items: center;
  }
}

.slidebar {
  height: 100vh;
  padding-bottom: 100px;
  overflow: auto;
}

.close {
  padding: 17px 15px 20px;
  display: flex;
  justify-content: flex-end;

  .closeImg {
    width: 24px;
    height: 24px;
  }
}

h3 {

  padding: 10px 15px;
  background-color: #F0F0F0;
  margin: 15px 0;
  font-size: 14px;
  color: #555;
}

// 未登录
.notLogged {
  border-top: 1px solid var(--ex-input-boder-bgColor);
  padding: 50px 15px 30px;

  .btnBox {
    margin-bottom: 20px;
  }
}

// 登录
.logged {
  border-top: 1px solid var(--ex-input-boder-bgColor);

  margin-top: 10px;
  padding: 10px 15px;
  font-size: 14px;
  color: var(--ex-font-color9);
  display: flex;
  align-items: center;

  .loggedImg {
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }

  div {
    color: var(--ex-font-color9);
  }
}
</style>
