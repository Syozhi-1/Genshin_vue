import Vue from 'vue'
import Router from 'vue-router'
import Limit from '@/components/Limit'
import Normal from '@/components/Normal'
import Weapon from '@/components/Weapon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/limit'
    },
    {
      path: '/limit',
      name: 'Limit',
      component: Limit
    },
    {
      path: '/normal',
      name: 'Normal',
      component: Normal
    },
    {
      path: '/weapon',
      name: 'Weapon',
      component: Weapon
    }
  ]
})
