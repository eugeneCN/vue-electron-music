import * as types from '../mutation-types'

const state = {
  record: [],
  index: 0,
  routesBtn: false,
  backActive: false,
  forwardActive: false
}

const getters = {
  getBackStatus: state => state.backActive,
  getForwardStatus: state => state.forwardActive,
  getRoutesBtn: state => state.routesBtn
}

const actions = {
  routesBack({ state, commit }, router) {
    commit(types.ROUTERS_BACKS, router)
  },
  routesForward({ state, commit }, router) {
    commit(types.ROUTERS_FORWARD, router)
  },
  routesRecord({ state, commit }, path) {
    commit(types.ROUTERS_RECORD, path)
  },
  routesBtnReset({ state, commit }, param) {
    commit(types.ROUTERS_STATUS, param)
  }
}

const callbacks = {
  buttonBack(index) {
    if (index > 0) {
      state.backActive = true
    } else {
      state.backActive = false
    }
  },
  buttonForward(index) {
    if ((index + 1) === state.record.length) {
      state.forwardActive = false
    } else {
      state.forwardActive = true
    }
  },
  buttonHighlight(index) {
    state.routesBtn = true
    this.buttonBack(index)
    this.buttonForward(index)
  }
}

const mutations = {
  [types.ROUTERS_RECORD](state, path) {
    state.record.push(path.fullPath)
    state.index = state.record.length - 1
    state.forwardActive = false
    callbacks.buttonBack(state.index)
  },
  [types.ROUTERS_BACKS](state, router) {
    if ((state.index - 1) < 0) return
    state.index--;
    callbacks.buttonHighlight(state.index)
    router.replace({ path: state.record[state.index] })
  },
  [types.ROUTERS_FORWARD](state, router) {
    if ((state.index + 1) >= state.record.length) return
    state.index++;
    callbacks.buttonHighlight(state.index)
    router.replace({ path: state.record[state.index] })
  },
  [types.ROUTERS_STATUS](state, param) {
    state.routesBtn = param
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
