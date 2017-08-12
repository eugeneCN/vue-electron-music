<template>
<div class="v-loading" v-show="show">
  <p>{{text}}</p>
</div>
</template>

<script>
export default {
  name: 'loading',
  data() {
    return {}
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.v-loading {
    font-size: 12px;
}
</style>
