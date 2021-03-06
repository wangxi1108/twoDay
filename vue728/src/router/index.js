import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Fenlei from '@/pages/Fenlei'
import Welfare from '@/pages/Welfare'
import My from '@/pages/My'
import List from '@/pages/List'
import Detail from '@/pages/Detail'
import App from '@/App'
import Cart from '@/pages/Cart'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
        children:[
              {
            path: '/',
            name: 'Home',
            component: Home
          },
          {
            path:'/Fenlei',
            name:'Fenlei',
            component:Fenlei
          },
          {
            path:'/Welfare',
            name:'Welfare',
            component:Welfare
          },
          {
            path:'/My',
            name:'My',
            component:My
          }


      ]
    },
    
    {
      path:'/List',
      name:'List',
      component:List
    },
    {
      path:'/Detail',
      name:'Detail',
      component:Detail
    },
    {
      path:'/Cart',
      name:'Cart',
      component:Cart
    }
    
  ]

})
