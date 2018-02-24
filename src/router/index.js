import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/Recommend'
import Singer from '@/components/Singer'
import Ranking from '@/components/Ranking'
import Search from '@/components/Search'
import DetailRanking from '@/components/DetailRanking'
import DetailSinger from '@/components/DetailSinger'

Vue.use(Router)

export default new Router({
  mode:'history',
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
      component:Singer,
      children:[
        {
          path:':id',
          name:'DetailSinger',
          component:DetailSinger
        }
      ]
    },
    {
      path:'/ranking',
      name:"Ranking",
      component:Ranking,
      children:[
        {
          path:':id',
          name:'DetailRanking',
          component:DetailRanking,
        }
      ]
    },
    {
      path:'/search',
      name:"Search",
      component:Search
    }
  ]
})
