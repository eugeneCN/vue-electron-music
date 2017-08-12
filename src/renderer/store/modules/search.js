import * as types from '../mutation-types'

const state = {
  data: {}
}

const getters = {
  getSearchStatus: state => state.data
}

const actions = {
  setSearchData({ state, commit }, data) {
    commit(types.SEARCH_DATA_SAVE, data)
  }
}

const mutations = {
  [types.SEARCH_DATA_SAVE](state, data) {
    state.data = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
