import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)
// 首页
const routerMusic = [{
  path: '/home',
  name: 'home',
  component: require('@/components/views/home/home')
}]

// MV页
const routerMv = [{
  path: '/mv',
  name: 'mv',
  component: require('@/components/views/mv/mv')
}]

// FM页
const routerFm = [{
  path: '/fm',
  name: 'fm',
  meta: true,
  component: require('@/components/views/fm/fm')
}]

// 搜索页
const routerSearch = [{
  path: '/search',
  name: 'search',
  meta: true,
  component: require('@/components/views/search/search'),
  redirect: {
    name: 'single'
  },
  children: [{
    path: '/single',
    name: 'single',
    component: require('@/components/views/search/component/single/single')
  }, {
    path: '/singer',
    name: 'singer',
    component: require('@/components/views/search/component/singer/singer')
  }, {
    path: '/album',
    name: 'album',
    component: require('@/components/views/search/component/album/album')
  }, {
    path: '/mv_s',
    name: 'mv_s',
    component: require('@/components/views/search/component/mv/mv')
  }, {
    path: '/song',
    name: 'song',
    component: require('@/components/views/search/component/song/song')
  }, {
    path: '/lyric',
    name: 'lyric',
    component: require('@/components/views/search/component/lyric/lyric')
  }, {
    path: '/radio',
    name: 'radio',
    component: require('@/components/views/search/component/radio/radio')
  }, {
    path: '/user',
    name: 'user',
    component: require('@/components/views/search/component/user/user')
  }]
}]

// 歌单详情页
const routerDetails = [{
  path: '/details',
  name: 'details',
  component: require('@/components/views/details/details')
}]

// 朋友页
const routerFriend = [{
  path: '/friend',
  name: 'friend',
  component: require('@/components/views/friend/friend')
}]

// iTunes页
const routeriTunes = [{
  path: '/iTunes',
  name: 'iTunes',
  component: require('@/components/views/iTunes/iTunes')
}]

// 下载页
const routerDownload = [{
  path: '/download',
  name: 'download',
  component: require('@/components/views/download/download')
}]

// 页面配置
const routes = [{
  path: '/',
  name: 'instructViews',
  redirect: { name: 'home' },
  component: require('@/components/instructViews'),
  children: [
    ...routerMusic,
    ...routerMv,
    ...routerFm,
    ...routerFriend,
    ...routeriTunes,
    ...routerDownload,
    ...routerSearch,
    ...routerDetails
  ]
}, {
  path: '/login',
  name: 'login',
  component: require('@/components/views/login/login')
}, {
  path: '*',
  redirect: '/'
}]

// 滚动行为
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return { y: 0 }
  }
}

// 嵌入路由
const router = new Router({
  routes,
  scrollBehavior,
  linkActiveClass: 'active'
})

// 钩子
router.beforeEach((to, from, next) => {
  if (store.getters.getRoutesBtn) {
    store.dispatch('routesBtnReset', false)
  } else {
    store.dispatch('routesRecord', to)
  }
  next()
})

export default router
