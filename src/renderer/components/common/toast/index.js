import toast from './toast'

export default {
  install: function (Vue) {
    Vue.component('v-toast', toast)
  }
}
