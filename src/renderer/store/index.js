import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'

import modules from './modules'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

if (debug) {
  console.log(modules)
}

export default new Vuex.Store({
  modules,
  strict: debug,
  plugins: !debug ? [logger()] : []
})
