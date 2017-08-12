<template>
<div id="window-top" class="bar bar-header window-top" ref="windowTop">
  <bar-button></bar-button>
  <view-header></view-header>
</div>
</template>

<script>
import viewHeader from '@/components/common/header/header'
import barButton from '@/components/common/barButton/barButton'
export default {
  name: 'windowTop',
  data() {
    return {}
  },
  components: { viewHeader, barButton },
  mounted() {},
  methods: {}
}
</script>
