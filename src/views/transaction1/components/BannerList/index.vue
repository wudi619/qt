<!-- 首页 -->
<template>
  <div class="box">
    <van-nav-bar left-arrow @click-left="onClickLeft" />
    <h3>{{ exchange }}</h3>
    <!-- 滑块 -->
    <van-switch v-model="checked" class="slidingBlock">
      <template #node>
        <div :class="checked ? 'slidingBlock1' : 'slidingBlock2'">
        </div>
      </template>
    </van-switch>
    <!-- 卖 -->
    <main>
      <div class="amountSheets" v-if="['paxpay'].includes(_getConfig('_APP_ENV'))"> {{ _t18(`openable_less`, ['paxpay'])
        }}({{ 0 }})</div>
      <div class="amountSheets" v-else>{{ _t18(`openable`, ['aams']) }}> <div class="number fw-num">
          {{ bearableValue ? _toFixed(bearableValue, 4) : 0 }}
          {{
            coinInfo.customizeFlag === 2
              ? matchText(coinInfo.showSymbol, '/USDT')
              : coinInfo.coin?.toUpperCase()
          }}
        </div>
      </div>
      <div class="calculator">
        <van-stepper v-model="value" input-width="40px" button-size="32px" />
      </div>
      <div class="tabulation">
        <van-row justify="space-between">
          <van-col span="6">杠杆</van-col>
          <van-col span="6">{{ 2 }}</van-col>
        </van-row>
        <!-- 保证金 -->
        <van-row justify="space-between">
          <van-col span="6">{{ _t18(`cash_deposit`) }}</van-col>
          <van-col span="6">{{ _toFixed(marginValue, 4) }} USDT</van-col>
        </van-row>
        <!-- 合约面值 -->
        <van-row justify="space-between">
          <van-col span="6">{{ _t18(`contract_face_value`, ['aams']) }}</van-col>
          <van-col span="6"> {{ coinInfo.shareNumber }}
            <span v-if="['das'].includes(_getConfig('_APP_ENV'))">
              {{ coinInfo.customizeFlag === 2 ? matchText(coinInfo.showSymbol, '/USDT') : 'USDT' }}
            </span>
            <span v-else>
              {{
                coinInfo.customizeFlag === 2
                  ? matchText(coinInfo.showSymbol, '/USDT')
                  : coinInfo.coin?.toUpperCase()
              }}
            </span>
            /{{ _t18(`lots`) }}
          </van-col>
        </van-row>

        <van-row justify="space-between">
          <van-col span="6">手续费</van-col>
          <van-col span="6">30</van-col>
        </van-row>
      </div>
    </main>

    <footer><van-button type="primary" block @click="buyOrSell(1)"> {{ _t18(`bb_sell1`) }} ({{ _t18(`open_short`)
        }})</van-button></footer>
  </div>
</template>
<script setup>
import { _mul, _div, _toFixed } from '@/utils/decimal'
import { DIFF_ISFREEZE } from '@/config/index'
import { useFreeze } from '@/hook/useFreeze'
const { _isFreeze } = useFreeze()
// import Handicap from '../../common/handicap.vue'
// import OrderListBox from './OrderList.vue'
import { _t18 } from '@/utils/public'
import { showToast, showLoadingToast, closeToast } from 'vant'
import { useToast } from '@/hook/useToast'
const { _toast } = useToast()
import { useMainStore } from '@/store/index'
const mainStore = useMainStore()
import { matchText, formatCurrentcurrency } from '@/utils/filters'
import {
  submitUcontract,
  contractHistoryList,
  contractLossList,
  orderList
} from '@/api/trade/index'
import { useTradeStore } from '@/store/trade'
const tradeStore = useTradeStore()

import { useUserStore } from '@/store/user/index'
const userStore = useUserStore()
const { asset } = storeToRefs(userStore)
import { socketDict } from '@/config/dict'
import PubSub from 'pubsub-js'
const orderListBoxRef = ref(null)
const props = defineProps({
  coinInfo: {
    type: Object,
    default: () => { }
  }
})
const coinPriceInfo = computed(() => {
  return tradeStore.allCoinPriceInfo[props.coinInfo

  ] || {}
})
const delegateTotal = ref('') // 数量（市价/限价）
const delegatePrice = ref('') // 价格（限价）
const sliderValue = ref(0) //滑动
//可用余额
const availableBalance = computed(() => {
  var cur = asset.value.filter((item) => {
    return item.type === 3
  })

  if (cur.length > 0) {
    return cur[0].availableAmount
  } else {
    return ''
  }
})

const marginValue = ref('0') //保证金
/**
 * 市价/限价委托
 */
const showPopover = ref(false) // 委托类型
const transactionLabel = ref(1) // 市价  1  限价 0
const onSelect = (item) => {
  transactionLabel.value = item
  showPopover.value = false
  delegateTotal.value = ''
  delegatePrice.value = ''
  sliderValue.value = 0
}

// 限价委托：设置交易价格
const setTradePrice = (val) => {
  delegatePrice.value = !transactionLabel.value ? val : ''
}
const contractObj = ref({}) // 币种对象
/**
 * 杠杆倍数
 */
const showPopoverNum = ref(false) //弹窗
const transactionNum = ref(null) //倍数
const numList = ref([]) //杠杆下拉
// 切换杠杆倍数
const selectNum = (item) => {
  transactionNum.value = item.name
  showPopoverNum.value = false
}
// 切换币种：重置价格、数量，杠杆变化
watch(
  () => props.coinInfo,
  (n) => {
    delegateTotal.value = ''
    setTradePrice()
    if (tradeStore.contractCoinList.length) {
      numList.value = []
      transactionNum.value = ''
      let newcoin = {}
      tradeStore.contractCoinList.forEach((element) => {
        if (element.coin === n) {
          contractObj.value = element
          newcoin = element
          return
        }
      })
      if (newcoin?.leverage) {
        newcoin.leverage.split(',').forEach((ele) => {
          numList.value.push({
            name: ele + 'X',
            id: ele
          })
        })
      }
      transactionNum.value = numList.value[0].name
    }
  }
)
// 监听滑块，修改数量（手）
watch(
  () => sliderValue.value,
  (n) => {
    console.log(n)
    let priceNew
    if (transactionLabel.value) {
      // 市价委托
      priceNew = coinPriceInfo.value.close
    } else {
      // 限价委托
      priceNew = delegatePrice.value
    }
    if (!priceNew) {
      sliderValue.value = 0
      return
    }
    let numberSlider
    if (['das'].includes(__config._APP_ENV)) {
      // 可用余额/合约面值
      // availableBalance/shareNumber
      numberSlider = _div(availableBalance.value, props.coinInfo.shareNumber)
    } else {
      // 可用余额*杠杆倍数/可用余额市价或输入价格/合约面值
      // availableBalance*transactionNum/priceNew/shareNumber
      numberSlider = _div(
        _div(
          _mul(
            availableBalance.value,
            transactionNum.value.substr(0, transactionNum.value.length - 1)
          ),
          priceNew
        ),
        props.coinInfo.shareNumber
      )
    }
    // 向下取整
    delegateTotal.value = Math.floor(_mul(numberSlider, _div(n, 100)))
  }
)
//监听数量，计算保证金
watch(
  () => delegateTotal.value,
  (n) => {
    if (n) {
      const regex = /^[1-9]\d*$/
      if (!regex.test(n)) {
        // 数量只能输入整数
        return _toast('quantitycan_onlyenter_integers')
      } else {
        var typeId = ''
        numList.value.forEach((element) => {
          if (element.name === transactionNum.value) {
            return (typeId = element.id)
          }
        })

        if (['das'].includes(__config._APP_ENV)) {
          // das平台：保证金=手*合约面值
          // delegateTotal.value*contractObj.value.shareNumber
          marginValue.value = _mul(delegateTotal.value, contractObj.value.shareNumber)
        } else {
          //保证金=价格*数量*合约面值/杠杆倍数
          // coinPriceInfo.value.close*n*contractObj.value.shareNumber/typeId
          marginValue.value = _toFixed(
            _div(_mul(_mul(coinPriceInfo.value.close, n), contractObj.value.shareNumber), typeId),
            6
          )
        }
      }
    } else {
      marginValue.value = '0'
    }
  }
)
// 监听价格
watch(
  () => delegatePrice.value,
  (n) => {
    if (n) {
      if (!/^[1-9]\d*(\.\d{1,6})?$|^0(\.\d{1,6})?$/.test(n) || Number(n) === 0) {
        // 请输入最多保留6位小数的大于0的价格
        return _toast('Please_entera_price_greater')
      }
    } else {
      sliderValue.value = 0
      delegateTotal.value = ''
    }
  }
)
// 监听杠杆倍数
watch(
  () => transactionNum.value,
  (n) => {
    const CurN = n.substr(0, n.length - 1)
    let priceNew
    if (transactionLabel.value) {
      priceNew = coinPriceInfo.value.close
    } else {
      priceNew = delegatePrice.value
    }
    if (!priceNew) {
      sliderValue.value = 0
      return
    }
    let numberSlider = _div(
      _div(_mul(availableBalance.value, CurN), priceNew),
      props.coinInfo.shareNumber
    )
    // // 向下取整
    if (!['das'].includes(__config._APP_ENV)) {
      delegateTotal.value = Math.floor(_mul(numberSlider, _div(sliderValue.value, 100)))
    }
  }
)
// 可开空=可用/价格*杠杆倍数
// das可开空=合约面值*手/价格*杠杆
const bearableValue = computed(() => {
  let price = transactionLabel.value ? coinPriceInfo.value.close : delegatePrice.value
  if (price) {
    var typeId = ''
    numList.value.forEach((element) => {
      if (element.name === transactionNum.value) {
        return (typeId = element.id)
      }
    })
    let result
    if (['das'].includes(__config._APP_ENV)) {
      result = _mul(_div(_mul(delegateTotal.value, contractObj.value.shareNumber), price), typeId)
    } else {
      result = _mul(_div(availableBalance.value, price), typeId)
    }
    return result
  } else {
    return 0
  }
})
// 初始化杠杆倍数
const init = () => {
  if (tradeStore.contractCoinList.length) {
    numList.value = []
    transactionNum.value = ''
    tradeStore.contractCoinList.forEach((element) => {
      if (element.coin === props.coinInfo.coin) {
        contractObj.value = element
        if (element.leverage) {
          element.leverage.split(',').forEach((element) => {
            numList.value.push({
              name: element + 'X',
              id: element
            })
          })
        }
        transactionNum.value = numList.value[0].name
        return
      }
    })
  }
}

/**
 * 买入/卖出按钮
 */
const buyOrSellForm = (type) => {
  // 杠杆倍数
  var typeId = ''
  numList.value.forEach((element) => {
    if (element.name === transactionNum.value) {
      return (typeId = element.id)
    }
  })
  let data = {
    symbol: props.coinInfo.coin, //币种
    leverage: typeId, //杠杆倍数
    delegatePrice: transactionLabel.value ? coinPriceInfo.value.close : delegatePrice.value, //价格
    delegateTotal: delegateTotal.value, //数量
    type: type, //0买入 1卖出
    delegateType: transactionLabel.value //委托类型0市价 1限价
  }
  if (
    !/^[1-9]\d*(\.\d{1,6})?$|^0(\.\d{1,6})?$/.test(data.delegatePrice) ||
    Number(data.delegatePrice) === 0
  ) {
    // 请输入最多保留6位小数的大于0的价格
    return _toast('Please_entera_price_greater')
  }
  if (!/^[1-9]\d*$/.test(data.delegateTotal)) {
    // 数量只能输入整数
    return _toast('quantitycan_onlyenter_integers')
  }
  try {
    showLoadingToast({
      forbidClick: true,
      duration: 0
    })
    submitUcontract(data).then((res) => {
      if (res.code === 200) {
        // !type ? '买入' : '卖出'}成功`
        _toast('quote_addSuccess')
        // 刷新订单
        orderListBoxRef.value.handelRefresh()
        userStore.getUserInfo()
      } else {
        closeToast()
        showToast(res.msg)
      }
    })
  } catch (error) {
    closeToast()
  }
}
const buyOrSell = (type) => {
  if (DIFF_ISFREEZE.includes(__config._APP_ENV)) {
    if (_isFreeze(DIFF_ISFREEZE)) {
      buyOrSellForm(type)
    }
  } else {
    buyOrSellForm(type)
  }
}

onMounted(() => {
  // init()
})
// 当前持仓 当前委托 止盈止损 历史委托
const trusetList = ref([
  {
    // name: ['coinsexpto'].includes(__config._APP_ENV)?_t18(`current_position2`):_t18(`current_position`,['latcoin']),
    name: _t18(`current_position`, ['latcoin']),
    num: 0,
    show: true
  },
  {
    name: _t18(`exchange_curentrust`, ['bitmake', 'ebc', 'latcoin']),
    num: 0,
    show: true
  },
  {
    name: _t18(`profit_loss`, ['paxpay', 'latcoin', 'aams']),
    num: 0,
    show: true
  },
  {
    // name: _t18(`exchange_hisentrust`, ['bitmake', 'ebc','latcoin']),
    name: ['coinsexpto'].includes(__config._APP_ENV)
      ? _t18(`exchange_hisentrust2`)
      : _t18(`exchange_hisentrust`, ['bitmake', 'ebc', 'latcoin']),
    num: 0,
    show: true
  }
])

/**
 * 订单模块
 */

/** 更新user */
const updateUser = () => {
  userStore.getUserInfo()
}
/**
 * 订单结算，更新订单和用户信息
 */
const coinOverKey = ref('')
const settlementKey = ref('')

const coinOverNotification = () => {
  /**
   * rxce平台周期改变通知
   */
  coinOverKey.value = PubSub.subscribe(socketDict.POSITION, (key, data) => {
    const { position } = JSON.parse(data.date.message)
    if (position) {
      orderListBoxRef.value.init()
      updateUser()
    }
  })
  /**
   * 结算改变通知
   */
  settlementKey.value = PubSub.subscribe(socketDict.SETTLEMENT, (key, data) => {
    const { type } = JSON.parse(data.date.message)
    if (type == 2) {
      orderListBoxRef.value.init()
      updateUser()
    }
  })
}
coinOverNotification()

onUnmounted(() => {
  settlementKey && PubSub.unsubscribe(settlementKey)
  coinOverKey && PubSub.unsubscribe(coinOverKey)
})
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
  padding: 15px 15px;

  .calculator {
    padding: 10px 0 20px;
  }

  .amountSheets {
    padding: 10px 0 30px;
  }

  .tabulation {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 200px;
  }

  .slidingBlock {
    padding: 20px;
    width: 300px;
    height: 80px;
    box-sizing: border-box;
    border-radius: 40px;
    margin: 20px;

    .slidingBlock1 {
      width: 40px;
      height: 60px;
    }
  }

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
  margin: 15px 0;
  font-size: 16px;
  color: #555;
}

.icon-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 18px;
}

.icon-wrapper .van-icon-success {
  line-height: 32px;
  color: var(--van-blue);
}

.icon-wrapper .van-icon-cross {
  line-height: 32px;
  color: var(--van-gray-5);
}
</style>
