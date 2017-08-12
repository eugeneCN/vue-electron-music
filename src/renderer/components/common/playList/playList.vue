<template>
<div class="playListDialog" v-show="playListStatus">
  <div class="bg" @click.stop.prevent="closed"></div>
  <div class="list">
    <header class="bar">
      <div class="wrap">
        <span>播放列表</span>
        <a class="btn" @click.stop.prevent="closed"></a>
      </div>
      <div class="bars">
        总{{musicArr.length}}首
      </div>
    </header>
    <div class="scrollBar">
      <ul id="list">
        <li v-for="item in musicArr" :class="{on: item.id == audio.id}" @click.stop.prevent="startPlay(item)">
          <div class="row">
            <div class="container">
              <div class="row">
                <div class="col-xs-7">
                  <span>{{item.name}}</span>
                </div>
                <div class="col-xs-5">
                  <span>{{item.singer}}</span>
                  <span class="right">{{item.time / 1000 | time}}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="not-data" v-if="musicArr.length == 0">
        您还没有播放任何歌曲 ~
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
// import { $ } from '@/utils/libs'
export default {
  name: 'playList',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      audio: 'getAudioStatus',
      musicArr: 'getSongListStatus',
      currentIndex: 'getCurrentIndex',
      playListStatus: 'getPlayListStatus'
    }),
    ...mapState({
      user: state => state.user.user
    })
  },
  watch: {
    audio(val) {
      console.log(val)
    },
    currentIndex(val) {
      console.log('正在播放的位置', val)
    }
  },
  filters: {
    // 时间字符格式化
    time(value) {
      value = value || 0.1
      var length = Math.floor(parseInt(value))
      var minute = Math.floor(value / 60)
      if (minute < 10) {
        minute = '0' + minute
      }
      var second = length % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    }
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
      if (!this.$el.contains(e.target) && this.playListStatus) {
        this.togglePlayList()
      }
    })
  },
  methods: {
    ...mapActions([
      'togglePlayList',
      'loadMusicUrl',
      'setMusicList'
    ]),
    closed() {
      this.togglePlayList(false)
    },
    startPlay(item) {
      this.setMusicList(item)
      this.loadMusicUrl(item.id)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './playList.scss';
</style>
