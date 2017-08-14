<template>
<div class="form" style="-webkit-app-region: drag">
  <header>
    <a class="btn closed" @click="closeDialog"></a>
  </header>
  <div class="bg"></div>
  <div class="form-group drag">
    <div class="input-group">
      <input type="text" v-model="form.user" placeholder="请输入手机号">
      <i class="icon phone"></i>
    </div>
    <div class="input-group">
      <input type="password" v-model="form.pass" placeholder="请输入密码">
      <i class="icon password"></i>
    </div>
    <div class="button-group">
      <button type="button" @click="login(0)" :class="{ 'on' : form.text }">{{form.text ? '登录中..' : '登录'}}</button>
    </div>
    <p class="tip">{{tips}}</p>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { app } from '@/utils/background'
import api from './api'
export default {
  name: 'loginView',
  data() {
    return {
      form: {
        user: '',
        pass: '',
        text: false
      },
      tips: ''
    }
  },
  computed: {
    ...mapGetters({
      loginDialogStatus: 'getLoginDialogStatus'
    })
  },
  components: {},
  mounted() {},
  methods: {
    closeDialog() {
      this.toggleLoginDialog(false)
    },
    login(item) {
      if (!this.form.user || !this.form.pass) {
        this.tips = '用户名和密码不能为空';
        return false
      }
      this.tips = '';
      this.form.text = !this.form.text
      const param = {
        phone: this.form.user,
        password: this.form.pass
      }
      api.login(param, (data) => {
        console.log(data)
        this.form.text = !this.form.text
        if (data.code === 200) {
          app.sendUserData(data)
          this.closeDialog()
        } else if (data.code === 400) {
          this.tips = `用户不存在`
        } else {
          this.tips = data.msg
        }
      })
    },
    ...mapActions([
      'toggleLoginDialog'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import './login.scss';
</style>
