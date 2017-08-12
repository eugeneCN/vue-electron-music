import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import loading from '@/components/common/loading'
import toast from '@/components/common/toast'
import pagination from '@/components/common/pagination'
// loading
Vue.use(loading)
// toast
Vue.use(toast);
// pagination
Vue.use(pagination)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
