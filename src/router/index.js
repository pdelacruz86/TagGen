import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login/Login'
import Store from '@/components/stores/stores'
import Portable from '@/components/tags/portable'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/tags/portable', name: 'Portable', component: Portable },
    { path: '/stores', name: 'Store', component: Store }
  ]
})

router.beforeEach((to, from, next) => {
  // work-around to get to the Vuex store (as of Vue 2.0)
  var token = localStorage.getItem('token')
  if (!token && to.name !== 'Login') {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router

