<template>
<div class="search-main scrollBar">
  <div class="keywords">
    搜索“<span>{{keywords}}</span>”，找到{{status}}
  </div>
  <nav class="search-nav">
    <ul>
      <li v-for="item in sideNav" @click="loadRouter(item)">
        <a href="javascript:;" :class="{ 'active': item.path == $route.path}">{{item.text}}</a>
      </li>
    </ul>
  </nav>

  <keep-alive>
    <router-view :data="dataArr"></router-view>
  </keep-alive>

  <div class="loading" v-if="visibile">
    <v-loading :show="visibile" text="正在载入.."></v-loading>
  </div>

  <div class="not-data" v-if="!visibile && !dataArr.length">
    很抱歉，未能找到与“ <span>{{keywords}}</span> ”相关的任何{{projetItem}}。
  </div>

  <div class="pagination" v-show="!visibile && dataArr.length">
    <v-pagination :total="total" :reset="reset" @current-val="doCurrent" @end-reset="reset = false"></v-pagination>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import api from './api'
import { $ } from '@/utils/libs'
export default {
  name: 'searchView',
  data() {
    var sideNav = [{
      text: '单曲',
      path: '/single',
      type: 1
    }, {
      text: '歌手',
      path: '/singer',
      type: 100
    }, {
      text: '专辑',
      path: '/album',
      type: 10
    }, {
      text: 'MV',
      path: '/mv_s',
      type: 1004
    }, {
      text: '歌单',
      path: '/song',
      type: 1000
    }, {
      text: '歌词',
      path: '/lyric',
      type: 1006
    }, {
      text: '电台',
      path: '/radio',
      type: 1009
    }, {
      text: '用户',
      path: '/user',
      type: 1002
    }]
    return {
      sideNav,
      status: '',
      keywords: '',
      projetItem: '单曲',
      visibile: false,
      dataArr: [],
      reset: false,
      total: 0,
      limit: 100
    }
  },
  components: {},
  mounted() {},
  created() {
    var keywords = this.$route.query.keywords
    if (keywords) this.callSearch(keywords, 1)
  },
  computed: {
    ...mapGetters({
      searchStatus: 'getSearchStatus'
    }),
    ...mapState({
      searchData: state => state.data
    })
  },
  watch: {
    '$route' (to, from) {
      var keywords = $('#search').value
      this.callSearch(keywords, to.query.type || 1)
    }
  },
  methods: {
    ...mapActions([
      'loadMusicUrl',
      'setMusicList'
    ]),
    doCurrent(val) {
      console.log(val)
      var keywords = $('#search').value
      var type = this.$route.query.type || 1
      console.log(type)
      this.callSearch(keywords, type, val)
    },
    loading() {
      this.visibile = !this.visibile
    },
    singleCall(data) {
      this.dataArr = data.songs || []
      this.status = data.songCount + '首' + this.projetItem
      this.total = Math.ceil(data.songCount / this.limit)
    },
    singerCall(data) {
      this.dataArr = data.artists || []
      this.status = data.artistCount + '位' + this.projetItem
      this.total = Math.ceil(data.artistCount / this.limit)
    },
    albumCall(data) {
      this.dataArr = data.albums || []
      this.status = data.albumCount + '张' + this.projetItem
      this.total = Math.ceil(data.albumCount / this.limit)
    },
    mvCall(data) {
      this.dataArr = data.mvs || []
      this.status = data.mvCount + '首' + this.projetItem
      this.total = Math.ceil(data.mvCount / this.limit)
    },
    playlistCall(data) {
      this.dataArr = data.playlists || []
      this.status = data.playlistCount + '个' + this.projetItem
      this.total = Math.ceil(data.playlistCount / this.limit)
    },
    callSearch(keywords, type, offset = 0) {
      this.keywords = keywords
      this.dataArr = []
      this.loading()
      if (type === 1004) {
        this.limit = 20
      }
      if (offset !== 0) {
        offset = (offset - 1) * this.limit
      }
      const param = { keywords, type, limit: this.limit, offset }
      const callback = (data) => {
        this.keywords = keywords
        // 1: 单曲
        if (type === 1) {
          this.singleCall(data.result)
        }
        // 10: 专辑
        if (type === 10) {
          this.albumCall(data.result)
        }
        // 100: 歌手
        if (type === 100) {
          this.singerCall(data.result)
        }
        // 1000: 歌单
        if (type === 1000) {
          this.playlistCall(data.result)
        }
        // 1004: MV
        if (type === 1004) {
          this.mvCall(data.result)
        }
        // 1002: 用户
        // 1006: 歌词
        // 1009: 电台
        // 大同小异 ...
        this.loading()
      }
      api.search(param, callback)
    },
    loadRouter(item) {
      this.projetItem = item.text
      this.reset = true
      var keywords = $('#search').value
      if (!keywords) return
      this.$router.push({ path: item.path, query: { type: item.type } })
    }
  }
}
</script>

<style lang="scss">
@import "./search.scss";
</style>
