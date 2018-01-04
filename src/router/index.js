import Vue from 'vue'
import Router from 'vue-router'
import PageHeader from '@/components/PageHeader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Header',
      component: PageHeader
    }
  ]
})
