import { ipcRenderer } from 'electron';
import { session } from '@/utils/storage'
import store from '@/store'

export function renderer() {
  // 开始播放
  ipcRenderer.on('play-start', (event) => {
    console.log('开始播放吧')
    var audio = session.getItem('AUDIO')
    store.dispatch('setMusicList', audio)
    store.dispatch('loadMusicUrl', audio.id)
  })
  // 添加到播放列表
  ipcRenderer.on('add-play-list', (event) => {
    console.log('添加到播放列表')
    var audio = session.getItem('AUDIO')
    audio['addUrl'] = true
    store.dispatch('setMusicList', audio)
  })
  //
  ipcRenderer.on('i-like-star', (event) => {
    window.alert('来个star给我动力做下去~ ^_^')
  })
}
