import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Admin from '@/views/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
