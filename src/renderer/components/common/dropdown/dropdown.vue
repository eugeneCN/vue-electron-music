<template>
<div class="dropdownList" v-show="dropdownListStatus">
  <div class="user-dropdown">
    <i class="arrow"></i>
    <ul class="list">
      <li>
        <div class="user">
          <img :src="user.avatarUrl" width="24" :alt="user.nickname">
          <span>{{user.nickname}}</span>
        </div>
      </li>
      <li>
        <div class="item">
          <a href="javascript:;" @click="quit()">退出登录</a>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
// import { $ } from '@/utils/libs'
export default {
  name: 'dropdown',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      audio: 'getAudioStatus',
      musicArr: 'getSongListStatus',
      currentIndex: 'getCurrentIndex',
      dropdownListStatus: 'getDropdownListStatus'
    }),
    ...mapState({
      user: state => state.user.user
    })
  },
  components: {},
  created() {},
  mounted() {
    /**
     * 点击文档收起播放列表
     * dev模式修改代码会多次绑定click,那么在这里先移除一下click事件!
     */
    document.removeEventListener('click', false)
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target) && this.dropdownListStatus) {
        this.toggleDropdownList()
      }
    })
  },
  methods: {
    ...mapActions([
      'toggleDropdownList',
      'userSignout'
    ]),
    quit() {
      this.toggleDropdownList()
      setTimeout(() => { this.userSignout() })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './dropdown.scss';
</style>
