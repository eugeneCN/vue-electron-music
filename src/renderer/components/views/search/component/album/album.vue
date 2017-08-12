<template>
<div class="album">
  <ul>
    <li v-for="(item, index) in data">
      <a href="javascript:;">
        <div class="row">
          <div class="container">
            <div class="row">
              <div class="col-xs-7">
                <i class="coverImg" :style="backgroundPic">
                  <img class="picUrl" :src="item.picUrl || picUrl">
                </i>
                <span class="name">{{item.name}}</span>
              </div>
              <div class="col-xs-2">
                <span class="name album">{{item.artist.name}}</span>
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
  name: 'album',
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
@import "./album.scss";
</style>
