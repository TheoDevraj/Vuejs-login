// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import store from './store'


// import Hello from '@/components/Hello'
import App from './App'
// pages
import login from './pages/login'
import dashboard from './pages/dashboard'

Vue.config.productionTip = false

Vue.use(Router)
Vue.use(VueResource)

Vue.component('app',App)

const routes = [
    { path: '/', name: 'home', component: login },
    { path: '/dashboard', name: 'dashboard', component: dashboard , meta: {requiresAuth: true}}
]

const router =  new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if(authUser && authUser.access_token) {
      next()
    } else {
      next({name:'home'})
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  router, store
}).$mount('#app')
