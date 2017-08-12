import * as types from '../mutation-types'
import { ajax } from '@/utils/libs'
import { config } from '@/api/config.js'

var base64 = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='

const state = {
  audio: {
    id: 0,
    name: '歌曲名称',
    singer: '演唱者',
    albumPic: base64,
    location: '音乐地址',
    album: '专辑'
  },
  currentIndex: 0, // 当前播放的歌曲位置
  playing: false, // 是否正在播放
  loading: false, // 是否正在加载中
  songList: [], // 播放列表
  currentTime: 0,
  tmpCurrentTime: 0,
  durationTime: 0,
  bufferedTime: 0,
  change: false // 判断是更改的时间还是播放的时间
}

const getters = {
  getAudioStatus: state => state.audio,
  getChangeStatus: state => state.change,
  getPlayingStatus: state => state.playing,
  getSongListStatus: state => state.songList,
  getCurrentIndex: state => state.currentIndex,
  getDurationTimeStatus: state => state.durationTime,
  getBufferedTimeStatus: state => state.bufferedTime,
  getTmpCurrentTimeStatus: state => state.tmpCurrentTime,
  getCurrentTimeStatus: state => state.currentTime,
  getPrCurrentTimeStatus: state => { return state.currentTime / state.durationTime * 100 },
  getPrBufferedTimeStatus: state => { return state.bufferedTime / state.durationTime * 100 }
}

const actions = {
  loadMusicUrl({ state, commit }, id) {
    const callback = (data) => {
      var url = data.data[0].url;
      commit(types.SET_MUSIC_DETAILS)
      commit(types.SET_MUSIC_URL, url)
    }
    const error = () => {
      window.alert('获取歌曲信息出错！')
    }
    ajax(`${config}/music/url`, { id }, callback, error)
    // commit(types.SET_MUSIC_DETAILS)
  },
  musicPlay({ state, commit }) {
    commit(types.MUSIC_PLAY)
  },
  musicPause({ state, commit }) {
    commit(types.MUSIC_PAUSE)
  },
  playNext({ state, commit }) {
    commit(types.PLAY_NEXT)
  },
  playPrev({ state, commit }) {
    commit(types.PLAY_PREV)
  },
  playChangeTime({ state, commit }, time) {
    commit(types.PLAY_CHANGE_TIME, time)
  },
  setMusicList({ state, commit }, songs) {
    commit(types.SET_MUSIC_LIST, songs)
  },
  setMusicChange({ state, commit }, flag) {
    commit(types.SET_MUSIC_CHANGE, flag)
  },
  updateCurrentTime({ state, commit }, time) {
    commit(types.UPDATE_CURRENT_TIME, time)
  },
  updateDurationTime({ state, commit }, time) {
    commit(types.UPDATE_DURATION_TIME, time)
  },
  updateBufferedTime({ state, commit }, time) {
    commit(types.UPDATE_BUFFERED_TIME, time)
  }
}

const mutations = {
  [types.MUSIC_PLAY](state) {
    state.playing = true
  },
  [types.MUSIC_PAUSE](state) {
    state.playing = false
  },
  [types.SET_MUSIC_CHANGE](state, flag) {
    state.change = flag
  },
  [types.SET_MUSIC_URL](state, location) {
    state.audio.location = location
  },
  [types.SET_MUSIC_DETAILS](state) {
    state.audio = state.songList[state.currentIndex - 1]
  },
  [types.PLAY_PREV](state) {
    state.currentIndex--;
    if (state.currentIndex < 1) {
      state.currentIndex = state.songList.length;
    }
    state.audio = state.songList[state.currentIndex - 1];
  },
  [types.PLAY_NEXT](state) {
    state.currentIndex++;
    if (state.currentIndex > state.songList.length) {
      state.currentIndex = 1
    }
    state.audio = state.songList[state.currentIndex - 1]
  },
  [types.PLAY_CHANGE_TIME](state, time) {
    state.tmpCurrentTime = time
  },
  [types.UPDATE_CURRENT_TIME](state, time) {
    state.currentTime = time
  },
  [types.UPDATE_DURATION_TIME](state, time) {
    state.durationTime = time
  },
  [types.UPDATE_BUFFERED_TIME](state, time) {
    state.bufferedTime = time
  },
  [types.SET_MUSIC_LIST](state, songs) {
    let items = Array.prototype.concat.call(songs)
    items.forEach(item => {
      let flag = false
      // 检测歌曲重复
      state.songList.forEach(function (element, index) {
        if (element.id === item.id) {
          flag = true
          state.currentIndex = index + 1
        }
      })
      // 只对添加到播放列表起作用
      if (item.addUrl) {
        ajax(`${config}/music/url`, { id: item.id }, (data) => { item.location = data.data[0].url })
      }
      if (!flag) {
        state.songList.push(item)
        state.currentIndex = state.songList.length
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
