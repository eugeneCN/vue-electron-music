import * as types from '../mutation-types'
import _ from 'lodash'
import { isDialog } from '@/utils/background'
const state = {
  showLoginDialog: false,
  showDropdownList: false,
  showPlayList: false,
  showPlayInfoBar: false,
  showPlayDetail: false
}

const getters = {
  getLoginDialogStatus: state => state.showLoginDialog,
  getDropdownListStatus: state => state.showDropdownList,
  getPlayListStatus: state => state.showPlayList,
  getPlayInfoBarStatus: state => state.showPlayInfoBar,
  getPlayDetailStatus: state => state.showPlayDetail
}

const actions = {
  toggleLoginDialog({ state, commit, rootState }, showLoginDialog) {
    commit(types.TOGGLE_LOGIN_DIALOG, showLoginDialog)
  },
  toggleDropdownList({ state, commit, rootState }, showDropdownList) {
    commit(types.TOGGLE_DROPDOWN_LIST, showDropdownList)
  },
  togglePlayList({ state, commit, rootState }, showPlayList) {
    commit(types.TOGGLE_PLAY_LIST, showPlayList)
  },
  togglePlayInfoBar({ state, commit, rootState }, showPlayInfoBar) {
    commit(types.TOGGLE_PLAY_INFO_BAR, showPlayInfoBar)
  },
  togglePlayDetail({ state, commit, rootState }, showPlayDetail) {
    commit(types.TOGGLE_PLAY_DETAIL, showPlayDetail)
  }
}

const mutations = {
  [types.TOGGLE_LOGIN_DIALOG](state, showLoginDialog) {
    if (_.isBoolean(showLoginDialog)) {
      state.showLoginDialog = showLoginDialog
    } else {
      state.showLoginDialog = !state.showLoginDialog
    }
    isDialog(showLoginDialog)
  },
  [types.TOGGLE_DROPDOWN_LIST](state, showDropdownList) {
    if (_.isBoolean(showDropdownList)) {
      state.showDropdownList = showDropdownList
    } else {
      state.showDropdownList = !state.showDropdownList
    }
  },
  [types.TOGGLE_PLAY_LIST](state, showPlayList) {
    if (_.isBoolean(showPlayList)) {
      state.showPlayList = showPlayList
    } else {
      state.showPlayList = !state.showPlayList
    }
  },
  [types.TOGGLE_PLAY_INFO_BAR](state, showPlayInfoBar) {
    if (_.isBoolean(showPlayInfoBar)) {
      state.showPlayInfoBar = showPlayInfoBar
    } else {
      state.showPlayInfoBar = !state.showPlayInfoBar
    }
  },
  [types.TOGGLE_PLAY_DETAIL](state, showPlayDetail) {
    if (_.isBoolean(showPlayDetail)) {
      state.showPlayDetail = showPlayDetail
    } else {
      state.showPlayDetail = !state.showPlayDetail
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
