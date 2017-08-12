<template>
<div class="scrollBar">
  <div class="a" v-html="palyData"></div>
  <div class="c">
    <v-loading :show="visibile" text="正在载入.."></v-loading>
  </div>
</div>
</template>

<script>
import api from './api'
export default {
  name: 'playDetailsView',
  data() {
    return {
      palyData: '',
      visibile: false
    }
  },
  props: {},
  components: {},
  mounted() {},
  created() {
    var id = this.$route.query.id
    this.loadPlayDetails(id)
  },
  watch: {
    '$route' (to, from) {
      this.loadPlayDetails(to.query.id)
    }
  },
  methods: {
    loading() {
      this.visibile = !this.visibile
    },
    loadPlayDetails(id) {
      this.palyData = ''
      this.loading()
      const param = { id }
      const callback = (data) => {
        console.log(data)
        this.palyData = data.playlist
        this.loading()
      }
      api.playDetails(param, callback)
    }
  }
}
</script>

<style lang="scss" scoped>
.a {
    padding: 20px;
}
.c {
    padding: 50px 0;
    text-align: center;
}
</style>
