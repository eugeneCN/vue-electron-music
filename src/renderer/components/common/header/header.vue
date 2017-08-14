<template>
<div class="header-bar-innter">
  <!-- logo S -->
  <div class="logo"></div>
  <!-- logo E -->

  <!-- toback S -->
  <div class="toback drag">
    <a @click="routerGo('back')" class="to-left radius-border" :class="{ 'active' : backStatus } "></a>
    <a @click="routerGo('forward')" class="to-right radius-border" :class="{ 'active' : forwardStatus }"></a>
  </div>
  <!-- toback E -->

  <!-- search S -->
  <div class="search drag">
    <div class="input-rows">
      <input type="text" v-model="keywords" @keyup.enter="search(keywords)" id="search" placeholder='搜索音乐，歌手，歌词，用户'>
      <i class="icon iconfont icon-sousuo"></i>
    </div>
  </div>
  <!-- search E -->

  <!-- useravatar S -->
  <div class="useravatar drag">
    <div class="avatar" v-if="!user.userId">
      <a href="javascript:;" class="dropdown" @click="login">
        <i class="default"></i>
      </a>
    </div>
    <div class="avatar" v-else>
      <a href="javascript:;" class="dropdown" @click.stop.prevent="toggleDropdownList()">
        <img :src="user.avatarUrl" width="24" :alt="user.nickname">
      </a>
    </div>
  </div>
  <!-- useravatar E -->
</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { app } from '@/utils/background'
import { session } from '@/utils/storage'
export default {
  name: 'header',
  data() {
    return {
      keywords: ''
    }
  },
  watch: {
    backStatus(val) {
      console.log(val)
    },
    forwardStatus(val) {
      console.log(val)
    }
  },
  computed: {
    ...mapGetters({
      userStatus: 'getUserStatus',
      userPathStatus: 'getUserPathStatus',
      backStatus: 'getBackStatus',
      forwardStatus: 'getForwardStatus'
    }),
    ...mapState({
      user: state => state.user.user
    })
  },
  components: {},
  created() {
    this.keywords = session.getItem('KEYWORDS') || ''
  },
  mounted() {
    app.loadUserData((data) => {
      console.log('loadUserData')
      this.userSignin(data.profile)
      this.$router.push({ path: this.userPathStatus.path })
    })
  },
  methods: {
    ...mapActions([
      'toggleLoginDialog',
      'togglePlayDetail',
      'toggleDropdownList',
      'userSignout',
      'userSignin',
      'routesBack',
      'routesForward',
      'routesRecord'
    ]),
    routerGo(item) {
      if (item === 'back') {
        this.routesBack(this.$router)
      }
      if (item === 'forward') {
        this.routesForward(this.$router)
      }
      return false
    },
    search(keywords) {
      if (!keywords) return
      session.setItem('KEYWORDS', keywords)
      this.togglePlayDetail(false)
      this.$router.push({
        path: '/search',
        query: { keywords }
      })
    },
    quit() {
      this.userSignout()
    },
    login() {
      this.toggleLoginDialog(true)
    }
  }
}
</script>

<style lang="scss">
@import "./header.scss";
</style>
