<template>
<div id="views" class="views">
  <div class="page">
    <side-bar></side-bar>
    <div class="instructViews">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>

<script>
import sideBar from '@/components/common/sideBar/sideBar'
export default {
  name: 'windowViews',
  components: {
    sideBar
  }
}
</script>
