<template>
<div class="playDetail" :class="{ 'open' : playDetailStatus }">
  <div class="scrollBar" ref="scroll">
    <div class="background" :style="backgroundPic"></div>
    <div class="content">
      <div class="plays-header">
        <div class="items">
          <div class="pic">
            <img :src="audio.albumPic">
          </div>
          <div class="disc">
            <span class="name ellipsis">{{audio.name}}</span>
            <span class="singer">歌手：{{audio.singer}}</span>
            <span class="singer">专辑：{{audio.album}}</span>
          </div>
        </div>
        <div class="items">
          <div class="lyric-holder">
            <div class="lrc-inner" style="transition: -webkit-transform 0.3s ease-out; transform-origin: 0px 0px 0px;" :style="{'transform':' translate3d(0px,-'+ lrcOffset +'px, 0px)'}">
              <p v-for="(item, index) in afterLrc" :class="{ 'on' : item.time == currentIndex }" :id="item.time" :key="index">{{item.txt}}</p>
            </div>
          </div>
          <div class="paly-btn">
            <button type="button" class="radius-border like" name="button"><span>喜欢</span></button>
            <button type="button" class="radius-border collect" name="button"><span>收藏</span></button>
            <button type="button" class="radius-border download" name="button"><span>下载</span></button>
            <button type="button" class="radius-border share" name="button"><span>分享</span></button>
          </div>
        </div>
      </div>
      <button type="button" class="closed radius-border" name="button" @click="closed"></button>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import api from './api'
export default {
  name: 'playDetail',
  data() {
    return {
      lyric: '',
      afterLrc: [],
      lrcIndex: 0,
      currentIndex: 0,
      likeActive: false
    }
  },
  watch: {
    audio(val) {
      // console.log(val)
      this.loadLrc(val.id)
    }
  },
  components: {},
  created() {
    setTimeout(() => {
      console.log(this.audio)
    })
  },
  computed: {
    ...mapState([]),
    ...mapGetters({
      audio: 'getAudioStatus',
      currentTime: 'getCurrentTimeStatus',
      playDetailStatus: 'getPlayDetailStatus'
    }),
    backgroundPic() {
      return {
        backgroundImage: 'url(' + this.audio.albumPic + ')'
      }
    },
    lrcOffset() {
      if (this.afterLrc && this.afterLrc.length > 1) {
        var current = Math.round(this.currentTime)
        // 2、根据时间得到歌词
        this.afterLrc.forEach((item, index) => {
          if (item.time === current) {
            this.lrcIndex = index
            this.currentIndex = current
            console.log(current, item.time)
          }
        })
        return this.lrcIndex * 30 || 0
      } else {
        return 0
      }
    },
    likeClass() {
      return {
        active: this.likeActive
      }
    }
  },
  methods: {
    ...mapActions([
      'togglePlayDetail'
    ]),
    closed() {
      this.togglePlayDetail();
      this.$refs.scroll.scrollTop = 0
    },
    likePlay() {
      this.likeActive = !this.likeActive
    },
    getLrc() {
      if (this.lyric) {
        var lyrics = this.lyric.split('\n')
        // console.log(lyrics)
        var lrcObj = []
        /*eslint-disable */
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
        /*eslint-enable */
        // 思路：1、把歌词进行处理以时间和歌词组成一个对象，放入afterLrc数组中
        // 2、在computed方法中根据当前的时间进行匹配歌词，然后查找在数据中的位置计算offset值
        for (var i = 0; i < lyrics.length; i++) {
          var timeRegExpArr = lyrics[i].match(timeReg)
          if (!timeRegExpArr) continue
          var txt = lyrics[i].replace(timeReg, '')
          // 处理时间
          for (var k = 0; k < timeRegExpArr.length; k++) {
            var array = {}
            var t = timeRegExpArr[k]
            /*eslint-disable */
            var min = Number(String(t.match(/\[\d*/i)).slice(1))
            var sec = Number(String(t.match(/\:\d*/i)).slice(1))
            /*eslint-enable */
            var time = min * 60 + sec
            array.time = time
            array.txt = txt
            lrcObj.push(array)
          }
        }
        this.afterLrc = lrcObj
      }
    },
    loadLrc(id) {
      // var self = this
      this.afterLrc = [{ 'txt': '正在加载中...' }]
      if (!id) {
        this.afterLrc = [{ 'txt': '这里显示歌词哦！' }]
        return
      }
      const param = { id, type: 'lyric' }
      const callback = (data) => {
        // console.log(data)
        // 1、先判断是否有歌词
        if (data.nolyric) {
          this.afterLrc = [{ 'txt': '暂无歌词' }]
          console.log('暂无歌词~')
        } else if (data.uncollected) {
          this.afterLrc = [{ 'txt': '纯音乐请您欣赏' }]
          console.log('纯音乐请您欣赏~')
        } else {
          this.lyric = data.lrc.lyric
          this.getLrc()
        }
      }
      const error = () => {
        this.afterLrc = [{ 'txt': '加载歌词失败' }]
      }
      api.loadLyric(param, callback, error)
    }
  }
}
</script>

<style lang="scss">
@import "./playDetail.scss";
</style>
