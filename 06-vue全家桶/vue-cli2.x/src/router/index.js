import Vue from 'vue';
// 导入路由 plugin
import Router from 'vue-router';
// 导入可路由的组件
// import aaa from '@/components/aaa';
// import bbb from '@/components/bbb';
// import user from '@/components/user';

// 路由懒加载
const aaa = () => import('../components/aaa.vue');
const aaachild1 = () => import('../components/aaachild1.vue');
const aaachild2 = () => import('../components/aaachild2.vue');
const bbb = () => import('../components/bbb.vue');
const user = () => import('../components/user.vue');

// 使用导入的路由 plugin
Vue.use(Router);

// 对外导出的这整个对象就是 vue 组件中的 $router
export default new Router({
  // 这个数组里面的源数对象就是 vue 组件中的 $route
  routes: [
    {
      path: '/',
      // 这种写法虽然默认也能跳转到 aaa，但是 URL 上没有 aaa 的 hash
      // name: 'aaa',
      // component: aaa

      // 这种写法也能跳转到 aaa，但是 URL 上有 aaa 的 hash
      redirect: '/aaa'
    },
    {
      path: '/aaa',
      name: 'aaa',
      component: aaa,
      children: [
        // 这里是路由的嵌套，说明aaa下面还有不同子模块页面的路由
        {
          path: 'aaachild1', // 这里不能用 /
          name: 'aaachild1',
          component: aaachild1
        },
        {
          path: 'aaachild2',
          name: 'aaachild2',
          component: aaachild2
        }
      ]
    },
    {
      path: '/bbb',
      name: 'bbb',
      component: bbb
    },
    {
      // 这个的使用就是动态路由，vue 组件中通过 $route.params.userId 可以获取
      path: '/user/:userId',
      name: 'user',
      component: user
    }
  ],

  mode: 'history', // mode: 'hash', 默认是 hash 模式，会带上 #/
  linkActiveClass: 'active' // 给所有 router-link 全局组件加上默认样式
});
