<template>
<div id="app">
  <div id="renderer">
    <window-top></window-top>
    <player-bar></player-bar>
    <window-view></window-view>
  </div>
  <div id="component">
    <play-list></play-list>
    <play-detail></play-detail>
    <dropdown-list></dropdown-list>
  </div>
</div>
</template>

<script>
import windowView from './windowViews'
import windowTop from '@/components/common/windowTop/windowTop'
import playerBar from '@/components/common/playerBar/playerBar'
import playList from '@/components/common/playList/playList'
import dropdownList from '@/components/common/dropdown/dropdown'
import playDetail from '@/components/common/playDetail/playDetail'
export default {
  name: 'instructViews',
  components: {
    windowView,
    windowTop,
    playerBar,
    playList,
    dropdownList,
    playDetail
  }
}
</script>
<style lang="scss">
@import 'src/renderer/assets/style/instructViews.scss';
</style>
