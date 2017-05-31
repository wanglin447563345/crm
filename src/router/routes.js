/**
 * 路由Map
 */
import table from '../components/routerView/home/home.vue'
import user from '../components/routerView/user/user.vue'
import order from '../components/routerView/order/order.vue'
import shop from '../components/routerView/shop/shop.vue'
import login from '../components/login/login.vue'
import index from '../components/index.vue'
// import home_routes from './home.js'

// 定义路由
const routes = [{
  path    : '/',
  redirect: to => {
    return 'login';
  },
  hidden  : true
}, {
  path     : '/login',
  component: login,
  hidden   : true
}, {
  path     : '/index',
  component: index,
  hidden   : true,
  redirect: to => {
    return '/index/home';
  },
  children : [{
    path     : 'home',
    component: table
  },{
    path     : 'order',
    component: order
  },{
    path     : 'shop',
    component: shop
  },{
    path     : 'user',
    component: user
  }]
}]

export default routes
