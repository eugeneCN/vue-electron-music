import * as types from '../mutation-types'
import { local } from '@/utils/storage'

const obj = {}

const state = {
  user: local.getItem('user') || obj,
  path: obj,
  data: obj
}

const getters = {
  getUserStatus: state => state.data,
  getUserPathStatus: state => state.path
}

const actions = {
  userSignin({ commit }, user) {
    commit(types.USER_SIGNIN, user)
  },
  userSignout({ commit }) {
    commit(types.USER_SIGNOUT)
  },
  instructionRoute({ state, commit }, path) {
    commit(types.USER_ROUTER_PATH, path)
  },
  setUserData({ state, commit }, data) {
    commit(types.USER_DATA_SAVE, data)
  }
}

const mutations = {
  [types.USER_SIGNIN](state, user) {
    local.setItem('user', user)
    state.user = user
  },
  [types.USER_SIGNOUT](state) {
    local.removeItem('user')
    state.user = {}
  },
  [types.USER_ROUTER_PATH](state, path) {
    state.path = path
  },
  [types.USER_DATA_SAVE](state, data) {
    state.data = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
