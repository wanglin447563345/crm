import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router/routes.js'    //这里引入的是router目录，会默认识别里面的index.js文件（不能是其他名字）
import axios from 'axios'
import NProgress from 'nprogress'
Vue.use(ElementUI)

Vue.use(VueRouter)
// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  linkActiveClass: 'nav-active',
  routes // （缩写）相当于 routes: routes
})
router.beforeEach((to, from, next) => {
  // 可以在路由元信息指定哪些页面需要登录权限
  const islogin = true // 假设没有登录（这里应从接口获取）
  if (to.meta.requiresAuth && !islogin) { // 需要登录授权，这里还需要判断是否登录
    next('/login') // 跳转到登录
    return
  }
  next()
})



new Vue({
  el: '#app',
  render: h => h(App),
  router
})
