<template>
<div id="player-bar" class="bar bar-footer player-bar">
  <div class="player-mini">
    <div class="content" style="overflow: hidden">
      <div class="play-audio">
        <audio :src="audio.location" @timeupdate="updateTime" @canplay="canPlaySong" @ended="next" id="audioPlay" />
      </div>
      <div class="play-btn">
        <a @click="prev()" class="prev">上一曲</a>
        <a @click="toggleStatus()" class="play-status" :class="playStatus">播放/暂停</a>
        <a @click="next()" class="next">下一曲</a>
      </div>
      <div class="play-wrap">
        <slider-bar @change="changeTime" v-model="prCurrentTime" />
      </div>
      <div class="play-innter">
        <div class="play-time">
          <time>{{currentTime | time}} /</time>
          <time>{{durationTime | time}}</time>
        </div>
        <div class="play-volume">
          <div class="voice" :title="voiceStyle" :class="{'close' : rangeStatus}" @click="rangeToggle()">
            <i class="icon"></i>
          </div>
          <slider-bar styles="volume" v-model="rangeVal" />
        </div>
        <div class="play-moer">
          <a class="for" title="循环播放" @click.stop.prevent="notOpen()">
            <span>循环播放</span>
          </a>
          <a class="lyric" title="打开歌词" @click.stop.prevent="notOpen()">
            <span>歌词</span>
          </a>
          <a class="list" :title="playListStyle" @click.stop.prevent="togglePlayList()">
            <span>播放列表</span>
            <span class="badge">{{musicArr.length}}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  <v-toast :visible="toast" :message="message" @close="toast = false" />
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { $ } from '@/utils/libs'
import { local, session } from '@/utils/storage'
import sliderBar from '@/components/common/slider/slider'
export default {
  name: 'playerBar',
  data() {
    return {
      rangeStatus: false,
      rangeVal: parseInt(local.getItem('rangeVal')) || 50,
      loadedTime: 0,
      playerTime: 0,
      toast: false,
      message: ''
    }
  },
  watch: {
    audio(val) {
      // console.log(val)
      if (this.musicArr.length > 0) {
        this.togglePlayInfoBar(true)
      }
    },
    currentTime(val) {
      // console.log(val, this.durationTime)
      if (val === this.durationTime && this.isMusicArr) {
        console.log('完了...', this.playing)
        this.musicPause()
        $('#audioPlay').pause()
      }
    },
    rangeVal(val) {
      local.setItem('rangeVal', val)
      $('#audioPlay').volume = val / 100
      if ((val / 100) > 0) {
        this.rangeStatus = false
      } else {
        this.rangeStatus = true
      }
    }
  },
  components: { sliderBar },
  created() {
    console.log(this.audio)
  },
  computed: {
    ...mapGetters({
      audio: 'getAudioStatus',
      change: 'getChangeStatus',
      playing: 'getPlayingStatus',
      musicArr: 'getSongListStatus',
      currentTime: 'getCurrentTimeStatus',
      durationTime: 'getDurationTimeStatus',
      bufferedTime: 'getBufferedTimeStatus',
      prCurrentTime: 'getPrCurrentTimeStatus',
      prBufferedTime: 'getPrBufferedTimeStatus',
      tmpCurrentTime: 'getTmpCurrentTimeStatus',
      playInfoBar: 'getPlayInfoBarStatus',
      playListStatus: 'getPlayListStatus'
    }),
    playStatus() {
      return {
        play: this.playing,
        pause: !this.playing
      }
    },
    isMusicArr() {
      return this.musicArr.length <= 1
    },
    voiceStyle() {
      return this.rangeStatus ? '恢复音量' : '静音'
    },
    playListStyle() {
      return this.playListStatus ? '关闭播放列表' : '打开播放列表'
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
  methods: {
    ...mapActions([
      'musicPlay',
      'musicPause',
      'playNext',
      'playPrev',
      'togglePlayList',
      'setMusicChange',
      'playChangeTime',
      'updateCurrentTime',
      'updateDurationTime',
      'updateBufferedTime',
      'togglePlayInfoBar'
    ]),
    canPlaySong() {
      $('#audioPlay').play()
      $('#audioPlay').volume = this.rangeVal / 100
      this.musicPlay()
      console.log('play...')
    },
    rangeToggle() {
      this.rangeStatus = !this.rangeStatus
      if (this.rangeStatus) {
        session.setItem('rangeVal', this.rangeVal)
        this.rangeVal = 0
      } else {
        this.rangeVal = parseInt(session.getItem('rangeVal'))
      }
    },
    toggleStatus() {
      var audioDom = $('#audioPlay')
      if (!this.musicArr.length) {
        this.showToast('没有找到能播放的歌曲')
        console.log('没有找到能播放的歌曲')
        return false
      }
      console.log(this.playing)
      if (this.playing) {
        audioDom.pause()
        this.musicPause()
      } else {
        audioDom.play()
        this.musicPlay()
      }
    },
    next() {
      if (!this.isMusicArr) {
        // this.toggleStatus()
        this.playNext()
      } else {
        this.showToast('没有找到能播放的歌曲')
      }
    },
    prev() {
      if (!this.isMusicArr) {
        // this.toggleStatus()
        this.playPrev()
        this.musicPlay()
      } else {
        this.showToast('没有找到能播放的歌曲')
      }
    },
    updateTime() {
      // var vm = this
      var audioDom = $('#audioPlay')
      var time = parseInt(audioDom.currentTime)
      // 防止在未加载完成时，切歌出现的错误
      // 由onprogress 改为 onsuspend事件。参考：http://www.cnblogs.com/tianma3798/p/6038908.html
      audioDom.onsuspend = () => {
        var timeRange = audioDom.buffered
        if (timeRange.length > 0 && audioDom.duration > 0) {
          this.updateBufferedTime(parseInt(audioDom.buffered.end(0)))
        }
      }
      this.updateDurationTime(parseInt(audioDom.duration))
      if (this.change) {
        audioDom.currentTime = this.tmpCurrentTime
        this.setMusicChange(false)
      } else {
        this.updateCurrentTime(time)
      }
    },
    changeTime(value) {
      // 改变播放时间事件
      var time = (value * this.durationTime) / 100
      this.playChangeTime(time)
      this.setMusicChange(true)
    },
    showToast(message) {
      this.toast = true
      this.message = message
    },
    notOpen() {
      console.log('暂未开放')
      this.showToast('来个star给我动力做下去~ ^_^')
    }
  }
}
</script>
<style lang="scss">
@import "./playerBar.scss";
</style>
