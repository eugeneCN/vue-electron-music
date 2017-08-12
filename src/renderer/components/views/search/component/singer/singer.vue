<template>
<div class="singer" ref="views">
  <ul>
    <li v-for="(item, index) in data">
      <a href="javascript:;">
        <div class="row">
          <div class="container">
            <i class="coverImg" :style="backgroundPic">
              <img class="picUrl" :src="item.picUrl || picUrl">
            </i>
            <span class="name">{{item.name}}</span>
          </div>
        </div>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
import picUrl from './assets/default.svg'
import { isNullObject } from '@/utils/libs'
export default {
  name: 'singer',
  data() {
    return {
      picUrl
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  watch: {
    data(val) {
      console.log(!isNullObject(val))
    }
  },
  computed: {
    backgroundPic() {
      return {
        backgroundImage: 'url(' + picUrl + ')'
      }
    }
  },
  components: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
@import "./singer.scss";
</style>
