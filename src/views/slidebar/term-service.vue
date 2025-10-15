<template>
  <!-- 服务条款 -->
  <div class="bind-card">
    <!-- 导航条 -->
    <HeaderBar :currentName="_t18(`sidebar_termsService`)" :cuttentRight="cuttentRight" :border_bottom="true">
    </HeaderBar>
    <!--内容-->
    <!-- <div class="itemDetailObj" v-html="currentHtml"></div>
    <Nodata v-if="!currentHtml"></Nodata> -->
    <div class="itemDetailObj">
      BigONE is a global blockchain digital asset custody and trading platform that is honest, safe, fast and win-win.
      The platform has established a complete digital asset trading ecosystem, including spot trading, leveraged
      trading, contract trading, financial management, lending, PoS mining pools, digital asset angel platform AngelONE,
      etc., to provide users with a full range of one-stop digital asset-related services.<br>

      BigONE implements 100% reserve, uses top wallet technology and risk control processes to ensure the security of
      users' digital assets, and provides global users with bank-level secure, reliable and easy-to-use blockchain asset
      custody and trading services.<br>

      The core members of the BigONE team have 7 years of experience in digital asset trading platform management, and
      also have rich experience in digital asset discovery. The platform adheres to the spirit of blockchain, creates
      the ONE token ecosystem, and advocates that users share the benefits and results of platform development. BigONE
      firmly believes that blockchain changes the future and is committed to becoming a portal to the blockchain world,
      creating a digital asset service platform for users that is more than just asset security.
      BigONE is a global cryptocurrency exchange registered in Seychelles with operation centers in Russia, Brazil,
      Vietnam, Seychelles, Singapore, Japan and Indonesia, while also carrying out other businesses and functions such
      as blockchain technology solutions, marketing and investment.
    </div>
  </div>
</template>
<script setup>
import { _t18 } from '@/utils/public'
const cuttentRight = { iconRight: [{ iconName: 'kefu', clickTo: 'event_serviceChange' }] }
import { rulesList } from '@/api/common/index'
const currentHtml = ref(null)
onMounted(async () => {
  try {
    const res = await rulesList('TERMS_CLAUSE')
    if (res.code === 200) {
      currentHtml.value = res.data[0].content
    }
  } catch (error) { }
})
</script>
<style>
.itemDetailObj {
  font-size: 12px;
  padding: 10px 15px;
  color: var(--ex-default-font-color);
  line-height: 24px;
  word-wrap: break-word;
}

.itemDetailObj img {
  width: 100%;
}
</style>
