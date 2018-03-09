import Vue from 'vue'
import Router from 'vue-router'
// 按需加载
const Recommend = resolve=>{
  import('@/components/Recommend').then(module=>{
    resolve(module);
  })
}
const Singer = resolve=>{
  import('@/components/Singer').then(module=>{
    resolve(module);
  })
}
const Ranking = resolve=>{
  import('@/components/Ranking').then(module=>{
    resolve(module);
  })
}
const Search = resolve=>{
  import('@/components/Search').then(module=>{
    resolve(module);
  })
}
const DetailRanking = resolve=>{
  import('@/components/DetailRanking').then(module=>{
    resolve(module);
  })
}
const DetailSinger = resolve=>{
  import('@/components/DetailSinger').then(module=>{
    resolve(module);
  })
}
const Admin = resolve=>{
  import('@/components/Admin').then(module=>{
    resolve(module);
  })
}
const RecommendDetail = resolve=>{
  import('@/components/RecommendDetail').then(module=>{
    resolve(module)
  })
}
Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path:'/admin',
      component:Admin
    },
    {
      path:'/recommend',
      name:"Recommend",
      component:Recommend,
      children:[
        {
          path:':id',
          component:RecommendDetail
        }
      ]
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
      component:Search,
      children:[
        {
          path:':id',
          name:'DetailSinger2',
          component:DetailSinger
        }
      ]
    }
  ]
})
