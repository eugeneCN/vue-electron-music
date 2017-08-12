<template>
<div class="sidebar">
  <div class="filter"></div>
  <nav ref="nav" :class="{ 'nav-scrollBar': isScrollBar }">
    <div ref="bar">
      <h4>推荐</h4>
      <ul>
        <li v-for="item in sideBar" @click="loadRoutePath(item)">
          <a href="javascript:;" :class="{ 'active': item.path == $route.path}">
            <i class="icon" :class="item.icon"></i>
            <span>{{item.text}}</span>
          </a>
        </li>
      </ul>
      <h4>我的音乐</h4>
      <ul>
        <li v-for="item in musics" @click="loadRoutePath(item)">
          <a href="javascript:;" :class="{ 'active': item.path == $route.path}">
            <i class="icon" :class="item.icon"></i>
            <span>{{item.text}}</span>
          </a>
        </li>
      </ul>
      <h4>创建的歌单</h4>
      <ul>
        <li v-for="item in createPlayMenu" @click="loadRoutePath(item)">
          <a href="javascript:;" :class="{ 'active': item.id == $route.query.id}">
            <i class="icon create" :class="{ likes : item.name === '我喜欢的音乐' }"></i>
            <span>{{item.text}}</span>
          </a>
        </li>
      </ul>
      <h4>收藏的歌单</h4>
      <ul>
        <li v-for="item in collectPlayMenu" @click="loadRoutePath(item)">
          <a href="javascript:;" :class="{ 'active': item.id == $route.query.id}">
            <i class="icon collect"></i>
            <span>{{item.text}}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
  <!-- S playInfoBar -->
  <div class="play-info-bar" ref="playInfoBar" v-show="playInfoBarStatus" @click="togglePlayDetail">
    <div class="pic">
      <img :src="audio.albumPic">
      <i class="icon shows"></i>
    </div>
    <div class="bar-content">
      <div class="infos">
        <span class="name ellipsis">{{audio.name}}</span>
        <span class="singer">{{audio.singer}}</span>
      </div>
      <div class="share"></div>
    </div>
  </div>
  <!-- E playInfoBar -->
</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { isNullObject, $ } from '@/utils/libs'
import { session } from '@/utils/storage'
import api from './api'
import _ from 'lodash'
export default {
  name: 'sideBar',
  data() {
    var sideBar = [{
      text: '发现音乐',
      path: '/home',
      icon: 'music'
    }, {
      text: '私人FM',
      path: '/fm',
      icon: 'fm'
    }, {
      text: 'MV',
      path: '/mv',
      icon: 'mv'
    }, {
      text: '朋友',
      path: '/friend',
      icon: 'friend',
      meta: true
    }]
    // 我的音乐
    var musics = [{
      text: 'iTunes音乐',
      path: '/iTunes',
      icon: 'iTunes'
    }, {
      text: '下载的音乐',
      path: '/download',
      icon: 'download'
    }]
    return {
      sideBar,
      musics,
      createPlayMenu: [],
      collectPlayMenu: [],
      isScrollBar: false,
      visible: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    ...mapGetters({
      audio: 'getAudioStatus',
      change: 'getChangeStatus',
      playing: 'getPlayingStatus',
      playInfoBarStatus: 'getPlayInfoBarStatus',
      playDetailStatus: 'getPlayDetailStatus'
    })
  },
  watch: {
    user(val) {
      if (!isNullObject(val)) {
        this.loadUserPlay(val.userId)
      } else {
        this.createPlayMenu = []
        this.collectPlayMenu = []
      }
    },
    playInfoBarStatus(val) {
      if (val) {
        setTimeout(() => {
          this.setNavHeight()
        })
      }
    },
    createPlayMenu(val) {
      this.$nextTick(() => this.setNavHeight())
    },
    collectPlayMenu(val) {
      this.$nextTick(() => this.setNavHeight())
    }
  },
  created() {
    if (!isNullObject(this.user)) {
      this.loadUserPlay(this.user.userId)
    }
  },
  components: {},
  mounted() {
    window.addEventListener('resize', () => {
      this.setNavHeight()
    })
  },
  methods: {
    ...mapActions([
      'toggleLoginDialog',
      'togglePlayDetail',
      'instructionRoute'
    ]),
    setNavHeight() {
      var windows = document.documentElement.clientHeight
      var windowTop = $('#window-top').offsetHeight
      var playerBar = $('#player-bar').offsetHeight
      var playInfoBar = this.$refs.playInfoBar.offsetHeight
      this.$refs.nav.style.height = windows - (windowTop + playerBar + playInfoBar) + 'px'
      this.isScrollBar = this.$refs.nav.offsetHeight < this.$refs.bar.offsetHeight
    },
    loadRoutePath(item) {
      if (item.meta && isNullObject(this.user)) {
        this.toggleLoginDialog(true)
        this.instructionRoute(item)
        return false
      } else {
        var path = _.isUndefined(item.id) ? { path: item.path } : { path: item.path, query: { id: item.id } }
        this.$router.replace(path)
      }
    },
    loadPlayDetails(item) {
      console.log(item)
      this.$router.push({
        path: '/playDetails',
        query: { id: item.id }
      })
    },
    loadUserPlay(uid) {
      const param = { uid }
      const callback = (data) => {
        var play = data.playlist
        for (let val of play) {
          val.name = val.name.replace(this.user.nickname, '我')
          val['text'] = val.name
          val['path'] = `/details`
        }
        // 获取创建的歌单 、收藏的歌单
        var createPlay = _.filter(play, { ordered: false });
        var collectPlay = _.filter(play, { ordered: true });
        // console.log('创建的歌单', createPlay)
        // console.log('收藏的歌单', collectPlay)
        session.setItem('CREATEPLAY', createPlay)
        // 赋值
        this.createPlayMenu = createPlay
        this.collectPlayMenu = collectPlay
      }
      api.userPlay(param, callback)
    }
  }
}
</script>

<style lang="scss">
@import './sideBar.scss';
</style>
