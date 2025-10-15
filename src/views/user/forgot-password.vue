<!-- 忘记密码 -->
<template>
  <Header :type="2"></Header>
  <div class="content">
    <div class="formData">
      <!-- 邮箱 -->
      <p>{{ _t18('login_emailCode') }}</p>
      <div>
        <input type="text" :placeholder="_t18('login_emailCode')" v-model="formData.email" />
      </div>
    </div>
    <div class="formData">
      <!-- 验证码 -->
      <p>{{ _t18('login_code') }}</p>
      <div>
        <input type="text" :placeholder="_t18('login_please')" v-model="formData.code" />
        <p v-if="!flag" @click="send()">{{ _t18('login_send') }}</p>
        <p v-else><van-count-down :time="time" format="ss" @finish="finish" /></p>
      </div>
    </div>
    <div class="formData">
      <!-- 新密码 -->
      <p>{{ _t18('forgot_newPwd') }}</p>
      <div>
        <input
          :type="showk ? 'text' : 'password'"
          :placeholder="_t18('login_please')"
          v-model="formData.password"
        />
        <svg-load :name="showk ? 'yanjin-k' : 'yanjin-g'" @click="showk = !showk"></svg-load>
      </div>
    </div>
    <div class="formData">
      <!-- 确认新密码 -->
      <p>{{ _t18('forgot_require_newPwd') }}</p>
      <div>
        <input
          :type="requireShowk ? 'text' : 'password'"
          :placeholder="_t18('login_please')"
          v-model="formData.password2"
          @input="inputPass"
        /><svg-load
          :name="requireShowk ? 'yanjin-k' : 'yanjin-g'"
          @click="requireShowk = !requireShowk"
        ></svg-load>
      </div>
    </div>
    <p class="requirePass" v-if="requirePass">*{{ _t18('register_pwd_diff') }}</p>
  </div>
  <Footer :type="2" :formDataToForget="formData"></Footer>
</template>

<script setup>
import Header from './components/signHeader.vue'
import Footer from './components/signFooter.vue'
import { emailCode } from '@/api/user'
import { showToast } from 'vant'
import { useToast } from '@/hook/useToast'
const { _toast } = useToast()
import { _t18 } from '@/utils/public'
// 眼睛
const showk = ref(false)
const requireShowk = ref(false)
const formData = ref({
  type: 2,
  email: '',
  password: '',
  password2: '',
  code: ''
})
const requirePass = ref(false)
const inputPass = () => {
  requirePass.value = formData.value.password2 !== formData.value.password ? true : false
}
// 倒计时展示标识
const flag = ref(false)
// 倒计时
const time = ref(0)
// 发送验证码
const send = () => {
  if (formData.value.email == '') {
    _toast(`login_please_emailCode`)
    return
  }
  emailCode('FIND_PASSWORD', formData.value.email).then((res) => {
    if (res.code == '200') {
      flag.value = true
      time.value = 60 * 1000
    } else {
      showToast(res.msg)
    }
  })
}
// 倒计时结束
const finish = () => {
  flag.value = false
}
</script>

<style lang="scss" scoped>
* {
  color: var(--ex-default-font-color);
  font-size: 14px;
}
.content {
  padding: 30px 15px 0;
}
:deep(.van-count-down) {
  font-size: 14px;
  color: var(--ex-font-color);
  padding: 0;
}
.requirePass {
  font-size: 10px;
  margin-top: 8px;
  color: var(--ex-font-color14);
}
.formData {
  & > p {
    margin: 20px 0 10px;
  }
  & > div {
    border: 1px solid var(--ex-border-color1);
    padding: 8px 10px;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1.5;
    div {
      display: flex;
      align-items: center;
      i {
        color: var(--ex-font-color9);
      }
      p {
        margin: 0 5px;
        color: var(--ex-font-color9);
      }
    }
    .jiantou {
      font-size: 10px;
    }
    input::placeholder {
      color: var(--ex-font-color5);
    }
    input {
      padding: 3px 0;
    }
    span {
      width: 50px;
      background-color: var(--ex-passive-font-color);
      height: 25px;
    }
    & > p {
      background-color: var(--ex-div-bgColor1);
      border-radius: 2px;
      padding: 3px 8px;
      color: var(--ex-font-color);
    }
  }
}
</style>
