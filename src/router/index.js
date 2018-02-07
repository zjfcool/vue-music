import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/Recommend'
import Singer from '@/components/Singer'
import Ranking from '@/components/Ranking'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path:'/recommend',
      name:"Recommend",
      component:Recommend
    },
    {
      path:'/singer',
      name:"Singer",
      component:Singer
    },
    {
      path:'/ranking',
      name:"Ranking",
      component:Ranking
    },
    {
      path:'/search',
      name:"Search",
      component:Search
    }
  ]
})
