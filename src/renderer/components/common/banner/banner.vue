<template>
<div class="banner" @mouseout="autoPaly" @mouseover="clearAutoPlay">
  <div class="wrap">
    <div class="item " v-for="(item, index) in banner" :class="styles(index)">
      <img :src="item.pic">
      <span class="tag">{{item.typeTitle}}</span>
    </div>
  </div>
  <p>
    <a href="#" v-for="(item, index) in banner" :class="styles(index)"></a>
  </p>
  <a @click="prev" class="btn prev">prev</a>
  <a @click="next" class="btn next">next</a>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'banner',
  data() {
    return {
      statusPlay: [0, 1, 2],
      btnTimer: false,
      autoPalyTimer: () => {}
    }
  },
  props: {
    banner: {
      type: Array,
      default: []
    }
  },
  components: {},
  mounted() {
    this.autoPaly()
  },
  watch: {
    statusPlay(val) {
      this.btnTimer = true
      setTimeout(() => {
        this.btnTimer = false
      }, 400)
    }
  },
  computed() {},
  methods: {
    styles(index) {
      return {
        l: index === this.statusPlay[0],
        o: index === this.statusPlay[1],
        r: index === this.statusPlay[2]
      }
    },
    autoPaly() {
      this.autoPalyTimer = setInterval(() => {
        this.next()
      }, 2000)
    },
    clearAutoPlay() {
      clearInterval(this.autoPalyTimer)
    },
    callNextPlay(item) {
      var arr = []
      for (let val of item) { arr.push(val + 1) }
      var maxValue = _.max(arr)
      var index = arr.indexOf(maxValue)
      if (maxValue === this.banner.length) {
        arr = this.replaces(arr, 0, maxValue, index)
      }
      return arr
    },
    callPrevPlay(item) {
      var arr = []
      for (let val of item) { arr.push(val - 1) }
      var minValue = _.min(arr)
      var index = arr.indexOf(minValue)
      if (minValue === -1) {
        arr = this.replaces(arr, this.banner.length - 1, minValue, index)
      }
      return arr
    },
    replaces(arr, item, max, index) {
      var array = arr.slice(0, index).concat(item, arr.slice(index));
      return array.filter((ele) => ele !== max)
    },
    prev() {
      if (!this.btnTimer) this.statusPlay = this.callPrevPlay(this.statusPlay)
    },
    next() {
      if (!this.btnTimer) this.statusPlay = this.callNextPlay(this.statusPlay)
    }
  }
}
</script>

<style lang="scss">
@import "./banner.scss"
</style>
