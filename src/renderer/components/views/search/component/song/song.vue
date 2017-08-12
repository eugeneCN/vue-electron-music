<template>
<div class="song">
  <ul>
    <li v-for="(item, index) in data">
      <a href="javascript:;">
        <div class="row">
          <div class="container">
            <div class="row">
              <div class="col-xs-7">
                <i class="coverImg" :style="backgroundPic">
                  <img class="picUrl" :src="item.coverImgUrl || picUrl">
                </i>
                <span class="name">{{item.name}}</span>
              </div>
              <div class="col-xs-2">
                <span class="name album">{{item.trackCount}}首</span>
              </div>
              <div class="col-xs-3">
                <span class="name album ellipsis">创建者：{{item.creator.nickname}}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
import picUrl from './assets/default.svg'
export default {
  name: 'song',
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

<style lang="scss" scoped>
@import "./song.scss";
</style>
