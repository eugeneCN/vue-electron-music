<template>
<div class="mv">
  <div class="list" v-for="(item, index) in dataArray" :data-item="index">
    <div class="item" v-for="(obj, index) in item">
      <div class="coverImg" :style="backgroundPic">
        <img class="picUrl " :src="obj.cover || picUrl ">
        <span class="playCount">{{obj.playCount}}</span>
        <span class="time">{{obj.duration / 1000 | time}}</span>
      </div>
      <div class="desc ellipsis">
        <span class="name">{{obj.name}}</span>
        <p class="artist">{{obj.artistName}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import picUrl from './assets/default.svg'
import _ from 'lodash'
export default {
  name: 'singer',
  data() {
    return {
      picUrl,
      dataArray: []
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    backgroundPic() {
      return {
        backgroundImage: 'url(' + picUrl + ')'
      }
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
  watch: {
    data(val) {
      if (_.isArray(val) && !!val.length) {
        var total = document.body.offsetWidth <= 1188 ? 4 : 5
        this.dataArray = _.chunk(val, total) || []
      } else {
        this.dataArray = []
      }
    }
  },
  created() {},
  components: {},
  mounted() {
    window.addEventListener('resize', () => {
      var total = document.body.offsetWidth <= 1188 ? 4 : 5
      this.dataArray = _.chunk(this.data, total) || []
    })
  },
  methods: {
    isWindowSize() {
      return document.body.offsetWidth
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./mv.scss";
</style>
