<template>
<div class="table-songs">
  <div class="thead">
    <div class="fixed">
      <div class="item null">
        <span>null</span>
      </div>
      <div class="item">
        <span>操作</span>
      </div>
    </div>
    <div class="adaptive">
      <div class="item">音乐标题</div>
      <div class="item">歌手</div>
      <div class="item">专辑</div>
      <div class="item">时长</div>
      <div class="item">热度</div>
    </div>
  </div>
  <div class="tbody">
    <ul>
      <li v-for="(item, index) in data" :class="activeClass(item)" ref="li" @dblclick.prevent="startPlay($event,item)" @click.prevent="addClassNames($event)">
        <div class="fixed">
          <div class="item" :class="activeClass(item)">
            <span v-text="indexText(index)"></span>
          </div>
          <div class="item">
            <span>
              <i class="icon collect"></i>
              <i class="icon download"></i>
            </span>
          </div>
        </div>
        <div class="adaptive">
          <div class="item ellipsis">
            <span ref="name">{{item.name}}</span>
            <span class="show-menu">
              <i @click="showMenu(item)"></i>
            </span>
          </div>
          <div class="item">{{item.album.artists[0].name}}</div>
          <div class="item">{{item.album.name}}</div>
          <div class="item time">{{item.duration / 1000 | time}}</div>
          <div class="item">
            <div class="mu-slider">
              <div class="mu-slider-track"></div>
              <div class="mu-slider-fill" :style="fillStyle(item.popularity)"></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { session } from '@/utils/storage'
import { app } from '@/utils/background'

export default {
  name: 'single',
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {},
  mounted() {
    window.addEventListener('resize', () => {
      this.fixedMenuBar()
    })
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
  created() {},
  computed: {
    ...mapGetters({
      audio: 'getAudioStatus',
      currentIndex: 'getCurrentIndex'
    })
  },
  watch: {
    data(val) {
      this.fixedMenuBar()
    }
  },
  methods: {
    ...mapActions([
      'loadMusicUrl',
      'setMusicList',
      'setSearchData'
    ]),
    fixedMenuBar() {
      const callback = (obj) => {
        if (obj.offsetWidth >= obj.parentNode.offsetWidth - 30) {
          obj.classList.add('shows')
        } else {
          obj.classList.remove('shows')
        }
      }
      this.$nextTick(() => {
        for (let item of this.$refs.name) {
          callback(item)
        }
      })
    },
    fillStyle(val) {
      return { width: `${val}%` }
    },
    indexText(val) {
      val = String(val + 1)
      return val.length < 2 ? `0${val}` : val
    },
    activeClass(item) {
      return { on: item.id === this.audio.id }
    },
    audioData(item) {
      const audio = {
        id: item.id,
        name: item.name,
        time: item.duration,
        singer: item.artists[0].name,
        albumPic: item.album.picUrl,
        album: item.album.name
      }
      return audio
    },
    startPlay(e, item) {
      const audio = this.audioData(item)
      this.setMusicList(audio)
      this.loadMusicUrl(audio.id)
    },
    showMenu(item) {
      const audio = this.audioData(item)
      session.setItem('AUDIO', audio)
      app.showMenus()
    },
    addClassNames(e) {
      let element = e.currentTarget;
      for (let item of this.$refs.li) {
        item.classList.remove('on')
      }
      if (!element.classList.contains('on')) {
        element.classList.toggle('on');
      }
    }
  }
}
</script>

<style lang="scss">
@import "./single.scss";
</style>
