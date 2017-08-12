<template>
<div class="header-bar-button">
  <div class="buttons">
    <a class="btn closes" title="关闭" @click="clickItem('window-close')"></a>
    <a class="btn minimize" title="最小化" @click="clickItem('window-min')"></a>
    <a class="btn maximize" title="最大化" @click="clickItem('window-max')"></a>
  </div>
</div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { ipcRenderer } from 'electron';
export default {
  name: 'barButton',
  computed: {
    ...mapGetters({
      audio: 'getAudioStatus',
      musicArr: 'getSongListStatus',
      currentIndex: 'getCurrentIndex',
      playListStatus: 'getPlayListStatus'
    }),
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    ...mapActions(['togglePlayList']),
    clickItem(item) {
      ipcRenderer.send(item)
    }
  }
}
</script>
<style lang="scss">
@import "./barButton.scss";
</style>
